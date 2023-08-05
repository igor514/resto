import {Controller, Param, Post, Body, UseGuards} from "@nestjs/common";

import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetAll} from "src/model/dto/getall.interface";
import {Unit} from "../../model/orm/unit.entity";
import {EmployeesGuard} from "../../common/guards/employees.guard";
import {UnitService} from "../../common/unit.service";

@Controller('restorator/units')
export class UnitsController {
    constructor(private unitsService: UnitService) {
    }

    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Unit[]>> {
        return this.unitsService.all(dto);
    }

    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Unit[]>> {
        return this.unitsService.chunk(dto);
    }

    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Unit>> {
        return this.unitsService.one(parseInt(id));
    }
}
