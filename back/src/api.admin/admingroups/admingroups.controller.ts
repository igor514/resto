import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetAll } from "../../model/dto/getall.interface";
import { AdmingroupsService } from "./admingroups.service";
import { Admingroup } from "../../model/orm/admingroup.entity";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/admingroups')
export class AdmingroupsController {
    constructor (private admingroupsService: AdmingroupsService) {}

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Admingroup[]>> {
        return this.admingroupsService.all(dto);
    }    
}
