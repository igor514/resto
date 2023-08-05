import {IOrderProduct} from "../orm/order.product.interface";

export interface IOrderGroup {
  id: number;
  order_ids?: number[]
  products?: IOrderProduct[]
  sum?: number;
}
