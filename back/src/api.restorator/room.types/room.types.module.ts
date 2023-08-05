import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomType} from "../../model/orm/room.type.entity";
import {jwtConstants} from "../../common/auth.constants";
import {RoomTypesService} from "./room.types.service";
import {RoomTypesController} from "./room.types.controller";
import {Module} from "@nestjs/common";
import {Employee} from "../../model/orm/employee.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoomType, Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [RoomTypesService],
    controllers: [RoomTypesController],
})
export class RoomTypesModule {}
