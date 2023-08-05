import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { jwtConstants } from "../../common/auth.constants";
import { FloorController } from "./floor.controller";
import { FloorService } from "./floor.service";
import {Floor} from "../../model/orm/floor.entity";
import {Room} from "../../model/orm/room.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Floor,
            Room,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [FloorService],
    controllers: [FloorController],
})
export class FloorModule {}
