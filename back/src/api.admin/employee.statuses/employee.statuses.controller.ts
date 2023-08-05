import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeeStatusesService } from "./employee.statuses.service";
import { EmployeeStatus } from "../../model/orm/employee.status.entity";
import { IEmployeeStatusUpdate } from "./dto/employee.status.update.interface";
import { IEmployeeStatusCreate } from "./dto/employee.status.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/employee-statuses')
export class EmployeeStatusesController {
    constructor (private employeeStatusesService: EmployeeStatusesService) {}            

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<EmployeeStatus[]>> {
        return this.employeeStatusesService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<EmployeeStatus[]>> {
        return this.employeeStatusesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<EmployeeStatus>> {
        return this.employeeStatusesService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IEmployeeStatusCreate): Promise<IAnswer<void>> {
        return this.employeeStatusesService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IEmployeeStatusUpdate): Promise<IAnswer<void>> {
        return this.employeeStatusesService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.employeeStatusesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.employeeStatusesService.deleteBulk(ids);
    }
}
