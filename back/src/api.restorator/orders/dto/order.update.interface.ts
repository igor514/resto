import { Employee } from "src/model/orm/employee.entity";
import { Hall } from "src/model/orm/hall.entity";
import { OrderStatus, Paymethod } from "src/model/orm/order.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Table } from "src/model/orm/table.entity";
import { IOrderProduct } from "./order.product.interface";
import {Floor} from "../../../model/orm/floor.entity";
import {Room} from "../../../model/orm/room.entity";

export interface IOrderUpdate {
    readonly id: number;    
    readonly table_id: number;    
    readonly hall_id: number;
    readonly room_id: number;
    readonly restaurant_id: number;    
    readonly employee_id: number;    
    readonly customer_comment: string;    
    readonly employee_comment: string;    
    readonly need_waiter: boolean;    
    readonly need_invoice: boolean;    
    readonly need_products: boolean;        
    readonly discount_percent: number;
    readonly sum: number;
    readonly status: OrderStatus;
    readonly paymethod: Paymethod;    
    readonly created_at: string;    
    readonly accepted_at: string;
    readonly completed_at: string;
    group_id?: number;

    table?: Table;
    hall?: Hall;
    room?: Room;
    floor?: Floor;
    employee?: Employee;
    restaurant?: Restaurant;
    readonly products?: IOrderProduct[];
}