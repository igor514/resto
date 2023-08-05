import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { jwtConstants } from "../../common/auth.constants";
import { RoomTypesController } from "./room.types.controller";
import { RoomTypesService } from "./room.types.service";
import {RoomType} from "../../model/orm/room.type.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoomType,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [RoomTypesService],
    controllers: [RoomTypesController],
})
export class RoomTypesModule {}
