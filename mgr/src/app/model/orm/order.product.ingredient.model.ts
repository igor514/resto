import { Model } from "../model";

export class OrderProductIngredient extends Model {
    public id: number;
    public order_product_id?: number;
    public name: string;
    public included: boolean;

    public init(): OrderProductIngredient {
        this.included = true;
        return this;
    }
}