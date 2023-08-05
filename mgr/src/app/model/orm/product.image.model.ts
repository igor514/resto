import { Model } from "../model";

export class ProductImage extends Model {
    public id: number;
    public product_id: number;
    public img: string;
    public pos: number;    
    
    public init(): ProductImage {
        this.pos = 0;
        return this;
    }
}
