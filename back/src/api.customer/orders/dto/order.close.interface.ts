import { Paymethod } from "src/model/orm/order.entity";

export interface IOrderClose {
    readonly order_id: number;
    readonly paymethod: Paymethod;
}