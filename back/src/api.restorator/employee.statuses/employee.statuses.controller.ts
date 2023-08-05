import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeeStatusesService } from "./employee.statuses.service";
import { IGetAll } from "src/model/dto/getall.interface";
import { IEmployeeStatus } from "./dto/employee.status.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";

@Controller('restorator/employee-statuses')
export class EmployeeStatusesController {
    constructor (private employeeStatusesService: EmployeeStatusesService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<IEmployeeStatus[]>> {
        return this.employeeStatusesService.all(dto);
    }      
}
