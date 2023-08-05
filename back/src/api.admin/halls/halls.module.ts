import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Hall } from "src/model/orm/hall.entity";
import { Table } from "src/model/orm/table.entity";
import { jwtConstants } from "../../common/auth.constants";
import { HallsController } from "./halls.controller";
import { HallsService } from "./halls.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Hall,
            Table,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [HallsService],
    controllers: [HallsController],
})
export class HallsModule {}
