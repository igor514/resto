import { Model } from "../model";
import { OrderProductIngredient } from "./order.product.ingredient.model";

export class OrderProduct extends Model {
    public id: number;
    public order_id?: number;
    public serving_id: number;
    public code: string;
    public name: string;
    public img: string;
    public price: number;
    public q: number;
    public completed: boolean;
    
    public ingredients?: OrderProductIngredient[];    

    public init(): OrderProduct {
        this.serving_id = 1;
        this.price = 0;
        this.q = 1;
        this.completed = false;
        this.ingredients = [];

        return this;
    }
}