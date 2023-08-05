import {Model} from "../model";
import {Unit} from "./unit.model";

export class IngredientType extends Model {
  public id: number;
  public name: string;
  public price: number;
  public unit_id: number;
  public restaurant_id: number;
  public unit: Unit;

  public init(restaurant_id: number): IngredientType {
    this.restaurant_id = restaurant_id
    this.price = 0;

    return this;
  }

  public build(data: Partial<IngredientType>): IngredientType {
    for (let key of Object.keys(data)) {
      if (key === 'unit') {
        this[key] = new Unit().build(data[key])
      } else {
        this[key] = data[key]
      }
    }
    return this
  }

}
