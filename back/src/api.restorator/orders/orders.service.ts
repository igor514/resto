import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {APIService} from "src/common/api.service";
import {SocketService} from "src/common/socket/socket.service";
import {IAnswer} from "src/model/dto/answer.interface";
import {IGetAll} from "src/model/dto/getall.interface";
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {Employee} from "src/model/orm/employee.entity";
import {Lang} from "src/model/orm/lang.entity";
import {Order, OrderStatus} from "src/model/orm/order.entity";
import {Serving} from "src/model/orm/serving.entity";
import {Sortdir} from "src/model/sortdir.type";
import {In, IsNull, Not, Repository} from "typeorm";
import {ServingsService} from "../servings/servings.service";
import {IOrderAccept} from "./dto/order.accept.interface";
import {IOrderCreate} from "./dto/order.create.interface";
import {IOrder} from "../../model/dto/order.interface";
import {IOrderUpdate} from "./dto/order.update.interface";
import * as ExcelJS from "exceljs";
import {Wordbook} from "src/model/orm/wordbook.entity";
import {Words} from "src/model/words.type";
import {GroupOrdersDto} from "./dto/group/group.orders.dto";
import {OrderGroup} from "../../model/orm/order.group.entity";
import {IGroupedOrders} from "./dto/group/grouped.orders.dto";
import {Table} from "../../model/orm/table.entity";
import {Room} from "../../model/orm/room.entity";
import {GetGroupDto} from "./dto/group/get.group.dto";
import {IGroupedOrder} from "./dto/group/grouped.order.dto";
import {IOrderProduct} from "./dto/order.product.interface";
import {IGroupResponse} from "./dto/group/group.response.interface";
import {GroupService} from "../../common/group.service";
import {GetGroupsDto} from "./dto/group/get.groups.dto";
import {IOrderPatch} from "./dto/group/order.patch.dto";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class OrdersService extends APIService {
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderGroup) private groupRepository: Repository<OrderGroup>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Table) private tableRepository: Repository<Table>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
        private servingsService: ServingsService,
        private socketService: SocketService,
        private groupService: GroupService,
    ) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: any = dto.filter;
            for (const key in filter) {
                if (filter[key] === null) {
                    filter[key] = IsNull()
                }
            }
            const data: Order[] = await this.orderRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                relations: ["products", "table", "table.hall", "room", "room.floor"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async accept(dto: IOrderAccept): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne({where: {status: OrderStatus.Active, id: dto.order_id}});
            const employee = await this.employeeRepository.findOne({where: {id: dto.employee_id}});

            if (!order || !employee || order.restaurant_id !== employee.restaurant_id) {
                return {statusCode: 409, error: "wrong data"};
            }

            if (order.employee_id) {
                return {statusCode: 410, error: "order already taken"};
            }

            order.employee_id = dto.employee_id;
            order.employee_comment = dto.employee_comment;
            order.accepted_at = new Date();
            await this.orderRepository.save(order);
            this.socketService.translateOrderAccepted(order.id);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.accept: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<IOrder>> {
        try {            
            const langs: Lang[] = await this.servingsService.getLangs();
            const order: IOrder = (await this.groupService.find({id}))[0]
            order.group = this.groupService.orderGroup(order)
                
            if (order) {
                for (let p of order.products) {
                    p.serving = this.servingsService.buildMlServing(p.serving as Serving, langs);
                }
            }

            return order ? {statusCode: 200, data: order} : {statusCode: 404, error: "order not found"};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async updateStatus(id: number, status: OrderStatus): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne({where: {id}});
            const body: QueryDeepPartialEntity<Order> = {status}

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }

            const related_ids: number[] = []
            if (status !== OrderStatus.Active && order.group_id) {
                const orders = await this.orderRepository.find({
                    where: {
                        group_id: order.group_id,
                        id: Not(id)
                    },
                    select: ['id']
                })
                body.group_id = null
                for (let o of orders) {
                    related_ids.push(o.id)
                }
            }

            Object.assign(order, body)
            if (order.status === OrderStatus.Completed) {
                order.completed_at = new Date();
            }
            await this.orderRepository.save(order);

            if (status === OrderStatus.Completed) {
                this.socketService.translateOrderCompleted(id);
            } else if(status === OrderStatus.Cancelled) {
                this.socketService.translateOrderCancelled(id)
            }

            for (let o of related_ids) {
                this.socketService.translateOrderUpdated(o, false)
            }

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.complete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    public async update(dto: IOrderUpdate): Promise<IAnswer<void>> {
        try {
            // удаляем лишние присоединенные объекты, чтобы не записалось каскадом лишнего (в typeorm каскад работает странно)
            delete dto.table;
            delete dto.hall;
            delete dto.room;
            delete dto.floor;
            delete dto.employee;
            delete dto.restaurant;

            if (dto.products?.length) {
                for (let p of dto.products) {
                    delete p.serving;
                }
            }

            const order = this.orderRepository.create(dto);
            const subtotal = order.products.length ? order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
            order.sum = (subtotal / 100) * (100 - order.discount_percent);
            await this.orderRepository.save(order);
            this.socketService.translateOrderUpdated(order.id);
            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async create(dto: IOrderCreate): Promise<IAnswer<void>> {
        try {
            const order = this.orderRepository.create(dto);            
            const subtotal = order.products.length ? order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
            order.sum = (subtotal / 100) * (100 - order.discount_percent);            
            await this.orderRepository.save(order);
            this.socketService.translateOrderCreated(order.id);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;``
            const filter = this.buildFilter(dto.filter);            
            const query = this.orderRepository.createQueryBuilder("orders").where(filter);
            const data: Order[] = await query
                .leftJoinAndSelect("orders.table", "table")
                .leftJoinAndSelect("orders.employee", "employee")
                .leftJoinAndSelect("orders.hall", "hall")
                .leftJoinAndSelect("orders.room", "room")
                .leftJoinAndSelect("room.floor", "floor")
                .orderBy({[`orders.${sortBy}`]: sortDir})
                .take(q)
                .skip(from)
                .getMany();
            const allLength: number = await query.getCount();
            const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);              

            return {statusCode: 200, data, allLength, sum};
        } catch (err) {
            const errTxt: string = `Error in OrdersService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async export(dto: IGetAll): Promise<ExcelJS.Buffer> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";              
            const filter = this.buildFilter(dto.filter);            
            const query = this.orderRepository.createQueryBuilder("orders").where(filter);            
            const orders: Order[] = await query
                .leftJoinAndSelect("orders.table", "table")
                .leftJoinAndSelect("orders.employee", "employee")
                .leftJoinAndSelect("orders.hall", "hall")
                .leftJoinAndSelect("orders.room", "room")
                .leftJoinAndSelect("room.floor", "floor")
                .orderBy({[`orders.${sortBy}`]: sortDir})
                .getMany();                        
            const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);              
            const words = await this.buildWords(dto.lang_id);            
            const buffer = await this.buildExcel(orders, sum, words);            
            return buffer;
        } catch (err) {
            const errTxt: string = `Error in OrdersService.export: ${String(err)}`;
            console.log(errTxt);
            return null;
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne({where: {id}});

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }
            
            await this.orderRepository.delete(id);
            this.socketService.translateOrderDeleted(order);
            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async activate(id: number): Promise<IAnswer<void>> {
        try {
            const order = await this.orderRepository.findOne({where: {id}});

            if (!order) {
                return {statusCode: 404, error: "order not found"};
            }

            order.status = OrderStatus.Active;
            order.completed_at = null;
            await this.orderRepository.save(order);
            this.socketService.translateOrderCreated(order.id); // с точки зрения официанта он как бы создался заново

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.activate: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private buildFilter(o: any): string {
        let filter: string = "TRUE";         

        if (o.created_at[0]) {
            const from: string = this.mysqlDate(new Date(o.created_at[0]));
            const to: string = o.created_at[1] ? this.mysqlDate(new Date(o.created_at[1])) : from;
            filter += ` AND orders.created_at BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
        }

        if (o.restaurant_id) {
            filter += ` AND orders.restaurant_id = '${o.restaurant_id}'`;
        }

        if (o.hall_id) {
            filter += ` AND orders.hall_id = '${o.hall_id}'`;
        }

        if (o.table_id) {
            filter += ` AND orders.table_id = '${o.table_id}'`;
        }

        if (o.employee_id) {
            filter += ` AND orders.employee_id = '${o.employee_id}'`;
        } 
        
        if (o.status) {
            filter += ` AND orders.status = '${o.status}'`;
        }

        if (o.room_id) {
            filter += ` AND orders.room_id = '${o.room_id}'`;
        }

        if (o.floor_id) {
            filter += ` AND orders.floor_id = '${o.floor_id}'`;
        }

        return filter;
    }

    private async buildWords(lang_id: number): Promise<Words> {                        
        let words = {};
        let wbl = await this.wordbookRepository.find({relations: ["words", "words.translations"]});            
        
        for (let wb of wbl) {
            words[wb.name] = {};

            for (let w of wb.words) {                
                words[wb.name][w.mark] = w.translations.find(t => t.lang_id === lang_id)?.text;                    
            }
        }        
        
        return words;
    }

    private async buildExcel(orders: Order[], sum: number, words: Words): Promise<ExcelJS.Buffer> {                
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('orders');
        worksheet.columns = [
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},
            {width: 20},            
        ];                    
        let row = worksheet.getRow(1);
        row.values = [
            words["restorator-orders"]["created-at"],
            words["restorator-orders"]["no"],
            words["restorator-orders"]["hall"],
            words["restorator-orders"]["table2"],
            words["restorator-orders"]["employee"],
            words["restorator-orders"]["sum"],
            words["restorator-orders"]["status"],
        ];
        row.eachCell((cell, no) => cell.font = {bold: true});        
        
        for (let i = 0; i < orders.length; i++) {
            const o = orders[i];            
            row = worksheet.getRow(i + 2);
            row.values = [
                this.humanDatetime(o.created_at),
                o.id,
                o.hall?.name,
                o.table?.no,
                o.employee?.name,
                o.sum,
                words["restorator-orders"][`status-${o.status}`],
            ];            
        }

        row = worksheet.getRow(orders.length + 2);
        row.values = ["","","","","",sum,""];

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }

    async patchGrouped(body: IOrderPatch): Promise<IAnswer<void>> {
        try {
            const {id, ...rest} = body;
            await this.orderRepository.update({id}, rest);
            this.socketService.translateOrderUpdated(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.patchGrouped: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    async getGroupOne(body: GetGroupDto): Promise<IAnswer<IGroupedOrder>> {
        try {
            let parent: Room | Table;
            if (body.room_id) {
                parent = await this.roomRepository.findOne({where: {id: body.room_id}})
            } else if (body.table_id) {
                parent = await this.tableRepository.findOne({where: {id: body.table_id}})
            } else {
                throw new Error("room_id and table_id both missing")
            }

            let orders = await this.groupService.find({...body, status: OrderStatus.Active})
            const langs = await this.servingsService.getLangs();
            for (let o of orders) {
                for (let p of o.products as IOrderProduct[]) {
                    p.serving = this.servingsService.buildMlServing(p.serving as Serving, langs);
                }
            }
            return {
                statusCode: 200,
                data: {
                    ...parent,
                    orders: orders,
                }
            }
        } catch (e) {
            return {
                statusCode: 400,
                error: e.message
            }
        }
    }

    async getGroupsAll(body: GetGroupsDto): Promise<IAnswer<IGroupedOrders>> {
        const sanitizeGroupOrder = (o: Order): Order => {
            delete o.room
            delete o.table
            return o
        }

        const roomsOrders = new Map<string, Order[]>();
        const tablesOrders = new Map<string, Order[]>();
        const orders = await this.orderRepository.find(
            {
                where: [{
                    restaurant_id: body.restaurant_id,
                    employee_id: body.employee_id,
                    status: OrderStatus.Active
                }],
                order: {created_at: "ASC"},
                relations: ['room', 'table', 'room.floor', 'table.hall']
            })

        const tables = new Map<string, Table>();
        const rooms = new Map<string, Room>();
        for (let o of orders) {
            const table = o?.table_id?.toString()
            const room = o?.room_id?.toString()
            if (table) {
                tables.set(table, o.table)
                o = sanitizeGroupOrder(o)
                if (tablesOrders.has(table)) {
                    tablesOrders.set(table, [...tablesOrders.get(table), o])
                } else {
                    tablesOrders.set(table, [o])
                }
            } else if (room) {
                rooms.set(room, o.room)
                o = sanitizeGroupOrder(o)
                if (roomsOrders.has(room)) {
                    roomsOrders.set(room, [...roomsOrders.get(room), o])
                } else {
                    roomsOrders.set(room, [o])
                }
            }
        }

        const data: IGroupedOrders = {
            rooms: Array.from(roomsOrders.entries()).map(v => ({
                ...rooms.get(v[0]),
                orders: v[1]
            })),
            tables: Array.from(tablesOrders.entries()).map(v => ({
                ...tables.get(v[0]),
                orders: v[1]
            }))
        }

        return {statusCode: 200, data}
    }

    async group(body: GroupOrdersDto): Promise<IAnswer<IGroupResponse>> {
        try {
            const orders = await this.orderRepository.find({
                where: {
                    ...body,
                    status: OrderStatus.Active
                }
            })
            if (orders.length === 0) {
                throw new Error("Order not found")
            }
            const groupedCount = orders.reduce((prev, curr)=> {
                if (curr.group_id !== null) {
                    return prev + 1;
                }
                return prev
            }, 0)

            let updated_ids: number[] = []
            let group_id: number = null

            if (groupedCount === orders.length) { // all grouped, ungroup all, group_id = null
                group_id = orders[0].group_id
                await this.groupRepository.delete({id: group_id})
                group_id = null
                updated_ids = orders.map(o => o.id) // all updated
            } else if (groupedCount === 0) { // all ungrouped, group all, group_id = new value
                const group = this.groupRepository.create()
                await this.groupRepository.save(group)
                group_id = group.id
                await this.orderRepository.update(
                    {id: In(orders.map(o => o.id))},
                    {group_id: group_id}
                );
                updated_ids = orders.map(o => o.id) // all updated
            } else { // some grouped, group rest, group_id = old value
                group_id = orders.find(o => o.group_id !== null).group_id
                updated_ids = orders
                    .filter(o => o.group_id === null)
                    .map(o => o.id) // some updated
                await this.orderRepository.update(
                    {id: In(updated_ids)},
                    {group_id: group_id}
                );
            }

            // translate updates
            for (const id of updated_ids) {
                this.socketService.translateOrderUpdated(id)
            }

            return {statusCode: 200, data: {group_id}};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.group: ${String(err)}`;
            console.log(errTxt);
            return {error: err.message, statusCode: 500}
        }
    }
}
