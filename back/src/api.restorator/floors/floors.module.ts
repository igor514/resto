import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";

import { jwtConstants } from "../../common/auth.constants";
import { FloorsController } from "./floors.controller";
import { FloorsService } from "./floors.service";
import {Room} from "../../model/orm/room.entity";
import {Floor} from "../../model/orm/floor.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Floor,
            Room,
            Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [FloorsService],
    controllers: [FloorsController],
})
export class FloorsModule {}
