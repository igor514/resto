import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetAll } from "src/model/dto/getall.interface";
import { IconsService } from "./icons.service";
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { IIcon } from "./dto/icon.interface";

@Controller('restorator/icons')
export class IconsController {
    constructor (private iconsService: IconsService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<IIcon[]>> {
        return this.iconsService.all(dto);
    }    
}
