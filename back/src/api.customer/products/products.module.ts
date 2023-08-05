import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ingredient } from "src/model/orm/ingredient.entity";
import { Product } from "src/model/orm/product.entity";
import { ProductImage } from "src/model/orm/product.image.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,            
            ProductImage,
            Ingredient,
        ]),        
    ],    
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
