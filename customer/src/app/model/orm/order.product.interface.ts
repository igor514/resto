import { IOrderProductIngredient } from "./order.product.ingredient.interface";

export interface IOrderProduct {
    readonly id: number;
    readonly order_id: number;
    readonly serving_id: number;
    readonly code: string;
    readonly name: string;
    readonly img: string;
    readonly price: number;
    readonly q: number;
    readonly completed: boolean;
    readonly ingredients: IOrderProductIngredient[];
}