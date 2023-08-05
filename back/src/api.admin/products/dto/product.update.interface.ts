import { Ingredient } from "src/model/orm/ingredient.entity";
import { ProductUnit } from "src/model/orm/product.entity";
import { ProductImage } from "src/model/orm/product.image.entity";

export interface IProductUpdate {
    readonly id: number;
    readonly restaurant_id: number;
    readonly cat_id: number;
    readonly code: string;
    readonly name: string;
    readonly price: number;
    readonly weight: number;
    readonly unit: ProductUnit;
    readonly cal: number;
    readonly time: string;
    readonly about: string;    
    readonly pos: number;
    readonly active: boolean;
    readonly recommended: boolean;
    readonly likes: number;
    readonly alc: boolean;
    readonly alc_percent: number;
    
    readonly images: ProductImage[];
    readonly ingredients: Ingredient[];
}