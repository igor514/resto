import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Lang } from "src/model/orm/lang.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Setting } from "src/model/orm/setting.entity";
import { jwtConstants } from "../../common/auth.constants";
import { Employee } from "../../model/orm/employee.entity";
import { EmployeeStatusesModule } from "../employee.statuses/employee.statuses.module";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";
import {Log} from "../../model/orm/log.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Employee,
            Setting,
            Restaurant,
            Lang,
            Log,
        ]),
        JwtModule.register(jwtConstants),
        CommonModule,
        EmployeeStatusesModule,
    ],    
    providers: [EmployeesService],
    controllers: [EmployeesController],
})
export class EmployeesModule {}
