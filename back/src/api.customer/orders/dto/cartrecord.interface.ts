import { Product } from "src/model/orm/product.entity";

export interface ICartRecord {
    product: Product;    
    q: number;    
}
