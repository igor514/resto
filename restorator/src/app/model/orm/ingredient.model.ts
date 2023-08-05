import { Model } from "../model";
import {IngredientType} from "./ingredient.type.model";
import {Unit} from "./unit.model";

export class Ingredient extends Model {
    public id: number;
    public product_id: number;
    public name: string;
    public pos: number;
    public excludable: boolean;
    public type_id: number;
    public unit_id: number;
    public amount: number;
    public type: IngredientType;
    public unit: Unit;

    public init(): Ingredient {
        this.pos = 0;
        this.excludable = false;
        return this;
    }
}
