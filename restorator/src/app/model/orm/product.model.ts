import { Model } from "../model";
import { Ingredient } from "./ingredient.model";
import { ProductImage } from "./product.image.model";

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
    
    public _q: number;
    public _added: boolean;
    public _timer: number;    

    public init(restaurant_id: number, cat_id: number): Product {
        this.restaurant_id = restaurant_id;
        this.cat_id = cat_id;
        this.code = "";
        this.name = "";
        this.price = 0;
        this.weight = 0;
        this.unit = ProductUnit.g;
        this.cal = 0;
        this.time = "";
        this.about = "";
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
}