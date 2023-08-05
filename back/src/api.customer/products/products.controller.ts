import { Controller, Param, Post, Body } from "@nestjs/common";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { ProductsService } from "./products.service";
import { Product } from "../../model/orm/product.entity";

@Controller('customer/products')
export class ProductsController {
    constructor (private productsService: ProductsService) {}                    

    // get fragment    
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Product[]>> {
        return this.productsService.chunk(dto);
    }
    
    // get one    
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Product>> {
        return this.productsService.one(parseInt(id));
    }  
    
    // like
    @Post("like/:id")
    public like(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.productsService.like(parseInt(id));
    }  
}
