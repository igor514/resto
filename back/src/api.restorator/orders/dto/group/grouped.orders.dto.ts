import {Table} from "../../../../model/orm/table.entity";
import {Room} from "../../../../model/orm/room.entity";
import {IOrder} from "../../../../model/dto/order.interface";

export interface IGroupedOrders {
    rooms: (Room & {
        orders: IOrder[]
    })[]
    tables: (Table & {
        orders: IOrder[]
    })[]
}