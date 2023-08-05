import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { jwtConstants } from "../../common/auth.constants";
import { EmployeeStatusesController } from "./employee.statuses.controller";
import { EmployeeStatusesService } from "./employee.statuses.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EmployeeStatus,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [EmployeeStatusesService],
    controllers: [EmployeeStatusesController],
})
export class EmployeeStatusesModule {}
