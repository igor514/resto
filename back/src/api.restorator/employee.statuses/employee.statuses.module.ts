import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";

import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { Lang } from "src/model/orm/lang.entity";
import { jwtConstants } from "../../common/auth.constants";
import { EmployeeStatusesController } from "./employee.statuses.controller";
import { EmployeeStatusesService } from "./employee.statuses.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EmployeeStatus,
            Employee,
            Lang,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [EmployeeStatusesService],
    controllers: [EmployeeStatusesController],
    exports: [EmployeeStatusesService]
})
export class EmployeeStatusesModule {}
