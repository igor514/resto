import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { HallsService } from "./halls.service";
import { Hall } from "../../model/orm/hall.entity";
import { IHallUpdate } from "./dto/hall.update.interface";
import { IHallCreate } from "./dto/hall.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";

@Controller('restorator/halls')
export class HallsController {
    constructor (private hallsService: HallsService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Hall[]>> {
        return this.hallsService.all(dto);
    }  

    // get fragment
    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Hall[]>> {
        return this.hallsService.chunk(dto);
    }
    
    // get one
    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Hall>> {
        return this.hallsService.one(parseInt(id));
    }

    // create
    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IHallCreate): Promise<IAnswer<void>> {
        return this.hallsService.create(dto);
    }

    // update
    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IHallUpdate): Promise<IAnswer<Hall>> {
        return this.hallsService.update(dto);
    }
    
    // delete one
    @UseGuards(EmployeesGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.hallsService.delete(parseInt(id));
    }    
}
