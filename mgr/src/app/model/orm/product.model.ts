import { Model } from "../model";
import { Cat } from "./cat.model";
import { Ingredient } from "./ingredient.model";
import { ProductImage } from "./product.image.model";
import { Restaurant } from "./restaurant.model";

export enum ProductUnit {
    g = "g",
    ml = "ml",
}

export class Product extends Model {
    public id: number;
    public restaurant_id: number;
    public cat_id: number;
    public code: string;
    public name: string;
    public price: number;
    public weight: number;
    public unit: ProductUnit;
    public cal: number;
    public time: string;
    public about: string;
    public pos: number;
    public active: boolean;
    public recommended: boolean;
    public likes: number;
    public alc: boolean;
    public alc_percent: number;

    public images?: ProductImage[];
    public ingredients?: Ingredient[];
    public restaurant?: Restaurant;
    public cat?: Cat;

    public init(): Product {
        this.restaurant_id = null;
        this.cat_id = null;
        this.price = 0;
        this.weight = 0;
        this.unit = ProductUnit.g;
        this.cal = 0;
        this.pos = 0;
        this.active = true;
        this.recommended = false;
        this.likes = 0;
        this.alc = false;
        this.alc_percent = 0;
        this.images = [];
        this.ingredients = [];

        return this;
    }

  public build(o: object): any {
    for (const field in o) {
      if (field === "date") {
        this[field] = new Date (o[field]);
      } else if (field === "ingredients") {
        this[field] = (o[field] as object[]).map(o => new Ingredient().build(o))
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }
}
