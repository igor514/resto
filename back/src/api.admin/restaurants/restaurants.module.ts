import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Restaurant } from "src/model/orm/restaurant.entity";
import { jwtConstants } from "../../common/auth.constants";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import {Setting} from "../../model/orm/setting.entity";
import {RestaurantFeeConfig} from "../../model/orm/restaurant.fee.config";
import {CommonModule} from "../../common/common.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant, RestaurantFeeConfig, Admin, Setting]),
        JwtModule.register(jwtConstants),
        CommonModule,
    ],
    providers: [RestaurantsService],
    controllers: [RestaurantsController],
})
export class RestaurantsModule {}
