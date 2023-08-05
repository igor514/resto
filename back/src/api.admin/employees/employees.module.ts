import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Employee } from "src/model/orm/employee.entity";
import { jwtConstants } from "../../common/auth.constants";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Employee,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [EmployeesService],
    controllers: [EmployeesController],
})
export class EmployeesModule {}
