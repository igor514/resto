import { Cart } from "../cart";

export interface IOrderAdd {
    readonly order_id: number;
    readonly cart: Cart;
}