import { ICart } from "./cart.interface";

export interface IOrderAdd {
    readonly order_id: number;
    readonly cart: ICart;
}