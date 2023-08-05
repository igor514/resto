import { IProduct } from "./orm/product.interface";

export interface ICartRecord {
    product: IProduct;    
    q: number;    
}
