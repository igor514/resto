import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IngredientTypesService } from "../../common/ingredient.types.service";
import { IGetAll } from "src/model/dto/getall.interface";
import {IngredientType} from "../../model/orm/ingredient.type.entity";
import {IngredientTypesCreateDto} from "./dto/ingredient.types.create.dto";
import {IngredientTypesUpdateDto} from "./dto/ingredient.types.update.dto";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/ingredient-types')
export class IngredientTypesController {
    constructor (private typesService: IngredientTypesService) {}

    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<IngredientType[]>> {
        return this.typesService.all(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetAll): Promise<IAnswer<IngredientType[]>> {
        return this.typesService.chunk(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<IngredientType>> {
        return this.typesService.one(parseInt(id));
    }

    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IngredientTypesCreateDto): Promise<IAnswer<void>> {
        return this.typesService.create(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IngredientTypesUpdateDto): Promise<IAnswer<void>> {
        return this.typesService.update(dto);
    }

    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.typesService.delete(parseInt(id));
    }    
}
