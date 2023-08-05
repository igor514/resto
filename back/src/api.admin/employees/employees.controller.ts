import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeesService } from "./employees.service";
import { Employee } from "../../model/orm/employee.entity";
import { IEmployeeUpdate } from "./dto/employee.update.interface";
import { IEmployeeCreate } from "./dto/employee.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}            

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Employee[]>> {
        return this.employeesService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Employee[]>> {
        return this.employeesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Employee>> {
        return this.employeesService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IEmployeeCreate): Promise<IAnswer<void>> {
        return this.employeesService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IEmployeeUpdate): Promise<IAnswer<void>> {
        return this.employeesService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.employeesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.employeesService.deleteBulk(ids);
    }
}
