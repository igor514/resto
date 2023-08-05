import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";
import { Ingredient } from "src/model/orm/ingredient.entity";
import { Product } from "src/model/orm/product.entity";
import { ProductImage } from "src/model/orm/product.image.entity";
import { jwtConstants } from "../../common/auth.constants";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductImage,
            Ingredient,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
