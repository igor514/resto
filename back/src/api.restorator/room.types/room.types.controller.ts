import {Controller, Post, Body, UseGuards} from "@nestjs/common";

import {IAnswer} from 'src/model/dto/answer.interface';
import {RoomTypesService} from "./room.types.service";
import {IGetAll} from "src/model/dto/getall.interface";
import {RoomType} from "../../model/orm/room.type.entity";
import {EmployeesGuard} from "../../common/guards/employees.guard";

@Controller('restorator/room-types')
export class RoomTypesController {
    constructor(private roomTypeService: RoomTypesService) {
    }

    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<RoomType[]>> {
        return this.roomTypeService.all(dto);
    }
}
