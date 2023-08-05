import { ICart } from "./cart.interface";

export interface IOrderCreate {
    readonly room_id?: number;
    readonly table_id?: number;
    readonly cart: ICart;
}