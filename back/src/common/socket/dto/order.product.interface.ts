import { OrderProductIngredient } from "src/model/orm/order.product.ingredient.entity";
import { Serving } from "src/model/orm/serving.entity";
import { IServing } from "./serving.interface";

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
    serving: Serving | IServing;   
    readonly ingredients: OrderProductIngredient[];
}