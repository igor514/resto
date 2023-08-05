import {Room} from "../../../../model/orm/room.entity";
import {Table} from "../../../../model/orm/table.entity";
import {IOrder} from "../../../../model/dto/order.interface";

export class IGroupedOrder {
    id: number;
    no: Table['no'] | Room['no'];
    capacity?: Room['capacity'];
    seats?: Table['seats'];
    orders: IOrder[]
}

