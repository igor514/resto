import {OrderProduct} from "../orm/order.product.entity";

export interface IOrderGroup {
    id: number;
    order_ids?: number[]
    products?: OrderProduct[]
    sum?: number;
}