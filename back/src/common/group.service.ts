import {Order} from "../model/orm/order.entity";
import {IOrder} from "../model/dto/order.interface";
import {IOrderGroup} from "../model/dto/order.group.interface";
import {OrderGroup} from "../model/orm/order.group.entity";
import {OrderProduct} from "../model/orm/order.product.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOptionsWhere, Repository} from "typeorm";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>
    ){}

    public orderGroup(order: Order | IOrder): IOrderGroup {
        let group: IOrderGroup = {
            id: null
        }
        if (!order.group?.id) return group


        let entity = order.group as OrderGroup
        let relatedOrders: Order[] = entity.orders?.filter(o => o.id !== order.id) || []

        const products: OrderProduct[] = []
        for (let order of relatedOrders) {
            products.push(...order.products)
        }

        group.id = entity.id;

        // all other orders ids
        group.order_ids = relatedOrders.map(o => o.id)

        // related orders sum
        group.sum = relatedOrders.reduce((prev, curr) => prev + curr.sum, 0)

        // related orders products
        group.products = products
        return group
    }

    public async findOne(order_id: number, filter: FindOptionsWhere<Order> = {}): Promise<IOrder> {
        const order: IOrder = await this.orderRepository.findOne(
            {
                where: [{id: order_id, ...filter}],
                relations: [
                    'products', 'products.serving', 'products.serving.translations',
                    'products.ingredients', 'group', 'group.orders', 'group.orders.products'
                ],
            })
        if (order) {
            order.group = this.orderGroup(order)
        }
        return order;
    }

    public async find(filter: FindOptionsWhere<Order>): Promise<IOrder[]> {
        const orders: IOrder[] = await this.orderRepository.find(
            {
                where: [{...filter}],
                relations: [
                    'products', 'products.serving', 'products.serving.translations',
                    'products.ingredients', 'group', 'group.orders', 'group.orders.products'
                ],
                order: {created_at: "ASC"},
            })
        orders.forEach(o => {o.group = this.orderGroup(o)})
        return orders;
    }
}