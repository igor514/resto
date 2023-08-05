import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IngredientTypesService } from "./ingredient.types.service";
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { IGetAll } from "src/model/dto/getall.interface";
import {IngredientType} from "../../model/orm/ingredient.type.entity";
import {IngredientTypesCreateDto} from "./dto/ingredient.types.create.dto";
import {IngredientTypesUpdateDto} from "./dto/ingredient.types.update.dto";

@Controller('restorator/ingredient-types')
export class IngredientTypesController {
    constructor (private typesService: IngredientTypesService) {}

    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<IngredientType[]>> {
        return this.typesService.all(dto);
    }

    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetAll): Promise<IAnswer<IngredientType[]>> {
        return this.typesService.chunk(dto);
    }

    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<IngredientType>> {
        return this.typesService.one(parseInt(id));
    }

    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IngredientTypesCreateDto): Promise<IAnswer<void>> {
        return this.typesService.create(dto);
    }

    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IngredientTypesUpdateDto): Promise<IAnswer<void>> {
        return this.typesService.update(dto);
    }

    @UseGuards(EmployeesGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.typesService.delete(parseInt(id));
    }    
}
