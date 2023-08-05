import {Controller, Param, Post, Body, UseGuards} from "@nestjs/common";

import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {FloorsService} from "./floors.service";
import {IFloorUpdate} from "./dto/floor.update.interface";
import {IFloorCreate} from "./dto/floor.create.interface";
import {IGetAll} from "src/model/dto/getall.interface";
import {EmployeesGuard} from "src/common/guards/employees.guard";
import {Floor} from "../../model/orm/floor.entity";

@Controller('restorator/floors')
export class FloorsController {
    constructor(private floorsService: FloorsService) {
    }

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Floor[]>> {
        return this.floorsService.all(dto);
    }

    // get fragment
    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Floor[]>> {
        return this.floorsService.chunk(dto);
    }

    // get one
    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Floor>> {
        return this.floorsService.one(parseInt(id));
    }

    // create
    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IFloorCreate): Promise<IAnswer<void>> {
        return this.floorsService.create(dto);
    }

    // update
    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IFloorUpdate): Promise<IAnswer<Floor>> {
        return this.floorsService.update(dto);
    }

    // delete one
    @UseGuards(EmployeesGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.floorsService.delete(parseInt(id));
    }
}
