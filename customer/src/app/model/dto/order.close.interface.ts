import { Paymethod } from "../orm/order.interface";

export interface IOrderClose {
    readonly order_id: number;
    readonly paymethod: Paymethod;
}