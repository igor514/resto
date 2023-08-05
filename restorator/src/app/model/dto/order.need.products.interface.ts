import { Order } from "../orm/order.model";
import { IOrderProduct } from "../orm/order.product.interface";

export interface IOrderNeedProducts {
    order: Order;
    products: IOrderProduct[];
}