import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {APIService} from "src/common/api.service";
import {SocketService} from "src/common/socket/socket.service";
import {IAnswer} from "src/model/dto/answer.interface";
import {Order, OrderStatus} from "src/model/orm/order.entity";
import {OrderProduct} from "src/model/orm/order.product.entity";
import {OrderProductIngredient} from "src/model/orm/order.product.ingredient.entity";
import {Table} from "src/model/orm/table.entity";
import {Repository} from "typeorm";
import {ICart} from "./dto/cart.interface";
import {IIngredient} from "./dto/ingredient.interface";
import {IOrderAdd} from "./dto/order.add.interface";
import {IOrderCallWaiter} from "./dto/order.callwaiter.interface";
import {IOrderClose} from "./dto/order.close.interface";
import {IOrderCreate} from "./dto/order.create.interface";
import {Room} from "../../model/orm/room.entity";
import {Restaurant} from "../../model/orm/restaurant.entity";
import {PriceService} from "../../common/price.service";
import {PaymentMethod} from "../../utils/constants";
import {IOrder} from "../../model/dto/order.interface";
import {GroupService} from "../../common/group.service";

@Injectable()
export class OrdersService extends APIService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Table) private tableRepository: Repository<Table>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        private groupService: GroupService,
        private socketService: SocketService,
        private priceService: PriceService,
    ) {
        super();
    }

    // создание нового заказа
    public async create(dto: IOrderCreate): Promise<IAnswer<Order>> {
        try {
            const hasTable = dto.hasOwnProperty('table_id')
            const hasRoom = dto.hasOwnProperty('room_id')
            if (!hasTable && !hasRoom) {
                return {statusCode: 500, error: "either table or room is required"};
            }

            const order = new Order();
            if (hasTable) {
                const table = await this.tableRepository.findOne({
                    where: {id: dto.table_id},
                    relations: ["hall", "hall.restaurant"]
                });
                if (!table || !table.hall || !table.hall.restaurant) {
                    return {statusCode: 404, error: "table or related not found"};
                }
                order.table_id = table.id;
                order.hall_id = table.hall.id;
                order.restaurant_id = table.hall.restaurant.id;
            } else if (hasRoom) {
                const room = await this.roomRepository.findOne({
                    where: {id: dto.room_id},
                    relations: ["floor", "floor.restaurant"]
                });
                if (!room || !room.floor || !room.floor.restaurant) {
                    return {statusCode: 404, error: "room or related not found"};
                }
                order.room_id = room.id;
                order.floor_id = room.floor.id;
                order.restaurant_id = room.floor.restaurant.id;
            }

            order.customer_comment = dto.cart.comment ? `<div>${this.humanDatetime(new Date())} ${dto.cart.comment}</div>` : "";
            order.products = this.buildOrderProducts(dto.cart);
            const sum = order.products.length ? order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
            order.sum = this.priceService.getOrderPrice(
                sum, await this.priceService.orderFees(order.restaurant_id, PaymentMethod.Stripe)
            ).total
            await this.orderRepository.save(order);
            this.socketService.translateOrderCreated(order.id);

            return {statusCode: 200, data: order};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // добавление товаров в заказ
    public async add(dto: IOrderAdd): Promise<IAnswer<Order>> {
        try {
            const order = await this.groupService.findOne(dto.order_id);

            if (!order) {
                return {statusCode: 404, error: "active order not found"};
            }

            order.customer_comment += dto.cart.comment ? `<div>${this.humanDatetime(new Date())} ${dto.cart.comment}</div>` : "";
            const products = this.buildOrderProducts(dto.cart);
            order.products = [...order.products, ...products];
            order.need_products = true;
            let subtotal = order.products.length ? order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
            subtotal = this.priceService.getOrderPrice(
                subtotal, await this.priceService.orderFees(order.restaurant_id, PaymentMethod.Stripe)
            ).total
            order.sum = (subtotal / 100) * (100 - order.discount_percent);
            await this.orderRepository.save(order);
            this.socketService.translateNeedProducts(order.id, products.map(p => p.id));

            return {statusCode: 200, data: order as Order};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.add: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // проверка статуса и получение актуальных данных заказа
    public async check(id: number): Promise<IAnswer<Order>> {
        try {
            const order = await this.getActiveOrderById(id);
            return order ? {statusCode: 200, data: order as Order} : {statusCode: 404, error: "active order not found"};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.check: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // запрос закрытия заказа
    public async close(dto: IOrderClose): Promise<IAnswer<Order>> {
        try {
            const order = await this.getActiveOrderById(dto.order_id);

            if (!order) {
                return {statusCode: 404, error: "active order not found"};
            }

            order.need_invoice = true;
            order.paymethod = dto.paymethod;
            await this.orderRepository.save(order);
            this.socketService.translateNeedInvoice(order.id);

            return {statusCode: 200, data: order as Order};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.close: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // вызов официанта
    public async callWaiter(dto: IOrderCallWaiter): Promise<IAnswer<Order>> {
        try {
            if (dto.order_id && !dto.table_id) { // для существующего заказа
                const order = await this.getActiveOrderById(dto.order_id);

                if (!order) {
                    return {statusCode: 404, error: "active order not found"};
                }

                order.need_waiter = true;
                await this.orderRepository.save(order);
                this.socketService.translateNeedWaiter(order.id);
                return {statusCode: 200, data: order as Order};
            }

            if (dto.table_id && !dto.order_id) { // для стола без заказа - создаем пустой заказ со статусом need_waiter
                const table = await this.tableRepository.findOne({
                    where: {id: dto.table_id},
                    relations: ["hall", "hall.restaurant"]
                });

                if (!table || !table.hall || !table.hall.restaurant) {
                    return {statusCode: 404, error: "table or related not found"};
                }

                const order = new Order();
                order.table_id = table.id;
                order.hall_id = table.hall.id;
                order.restaurant_id = table.hall.restaurant.id;
                order.products = [];
                order.need_waiter = true;
                await this.orderRepository.save(order);
                this.socketService.translateOrderCreated(order.id);
                return {statusCode: 200, data: order};
            }

            return {statusCode: 409, error: "wrong data"};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.callWaiter: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private async getActiveOrderById(id: number): Promise<IOrder> {
        return this.groupService.findOne(id, {status: OrderStatus.Active})
    }

    private buildOrderProducts(cart: ICart): OrderProduct[] {
        const products: OrderProduct[] = [];

        for (let r of cart.records) {
            const product = new OrderProduct();
            product.serving_id = cart.serving_id;
            product.code = r.product.code;
            product.name = r.product.name;
            product.img = r.product.images.length ? r.product.images[0].img : null;
            product.price = r.product.price;
            product.q = r.q;
            product.ingredients = [];

            for (let i of r.product.ingredients) {
                const ingredient = new OrderProductIngredient();
                ingredient.name = i.name;
                ingredient.included = (<IIngredient>i).included;
                product.ingredients.push(ingredient);
            }

            products.push(product);
        }

        return products;
    }
}