import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Serving } from "src/model/orm/serving.entity";
import { jwtConstants } from "../../common/auth.constants";
import { ServingsController } from "./servings.controller";
import { ServingsService } from "./servings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Serving, Admin]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [ServingsService],
    controllers: [ServingsController],
})
export class ServingsModule {}
