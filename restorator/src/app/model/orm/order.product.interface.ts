import {IOrderProductIngredient} from "./order.product.ingredient.interface";
import {IServing} from "./serving.interface";

export interface IOrderProduct {
  id?: number;
  order_id?: number;
  serving_id: number;
  code: string;
  name: string;
  img: string;
  price: number;
  q: number;
  completed: boolean;
  ingredients?: IOrderProductIngredient[];
  serving?: IServing;

  _highlight?: boolean;
}
