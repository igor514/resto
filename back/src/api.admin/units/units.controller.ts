import {Controller, Param, Post, Body, UseGuards, ValidationPipe, UsePipes} from "@nestjs/common";

import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetAll} from "src/model/dto/getall.interface";
import {AdminsGuard} from "src/common/guards/admins.guard";
import {Unit} from "../../model/orm/unit.entity";
import {UnitDto} from "./dto/unit.dto";
import { UnitService } from "src/common/unit.service";

@Controller('admin/units')
export class UnitsController {
    constructor(private unitsService: UnitService) {}

    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Unit[]>> {
        return this.unitsService.all(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Unit[]>> {
        return this.unitsService.chunk(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Unit>> {
        return this.unitsService.one(parseInt(id));
    }

    @UseGuards(AdminsGuard)
    @Post("create")
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: {strategy: "excludeAll"} }))
    public create(@Body() dto: UnitDto): Promise<IAnswer<void>> {
        return this.unitsService.create(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("update")
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: {strategy: "excludeAll"} }))
    public update(@Body() dto: UnitDto): Promise<IAnswer<void>> {
        return this.unitsService.update(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.unitsService.delete(parseInt(id));
    }

    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.unitsService.deleteBulk(ids);
    }
}
