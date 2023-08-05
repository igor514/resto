import {Model} from "../model";
import {Unit} from "./unit.model";
import {IngredientType} from "./ingredient.type.model";

export class Ingredient extends Model {
  public id: number;
  public product_id: number;
  public name: string;
  public pos: number;
  public excludable: boolean;

  public unit_id: number;
  public type_id: number;
  public unit: Unit;
  public type: IngredientType;

  public init(): Ingredient {
    this.pos = 0;
    this.excludable = false;

    return this;
  }

  public build(o: object): any {
    for (const field in o) {
      if (field === "date") {
        this[field] = new Date (o[field]);
      } else if (field === "unit") {
        this[field] = new Unit().build(o[field])
      } else if (field === "type") {
        this[field] = new IngredientType().build(o[field])
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }
}
