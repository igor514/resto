import { OrderStatus, Paymethod } from "src/model/orm/order.entity";
import { IOrderProduct } from "./order.product.interface";

export interface IOrderCreate {    
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
    readonly status: OrderStatus;
    readonly paymethod: Paymethod;    
    readonly products?: IOrderProduct[];
}