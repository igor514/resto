import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";
import { Order } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { OrderProductIngredient } from "src/model/orm/order.product.ingredient.entity";
import { jwtConstants } from "../../common/auth.constants";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            OrderProduct,
            OrderProductIngredient,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
