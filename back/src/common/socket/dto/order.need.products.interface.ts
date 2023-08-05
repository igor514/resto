import { IOrderProduct } from "src/api.restorator/orders/dto/order.product.interface";
import { Order } from "src/model/orm/order.entity";

export interface IOrderNeedProducts {
    order: Order;
    products: IOrderProduct[];
}