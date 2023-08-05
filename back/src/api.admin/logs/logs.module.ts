import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { jwtConstants } from "../../common/auth.constants";
import { LogsController } from "./logs.controller";
import { LogsService } from "./logs.service";
import {Log} from "../../model/orm/log.entity";
import {Admin} from "../../model/orm/admin.entity";
import {Employee} from "../../model/orm/employee.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Log, Admin, Employee]),
        JwtModule.register(jwtConstants),
    ],
    exports: [LogsService],
    providers: [LogsService],
    controllers: [LogsController],
})
export class LogsModule {}
