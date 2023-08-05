import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { LogsService } from "./logs.service";
import { AdminsGuard } from "src/common/guards/admins.guard";
import {Log} from "../../model/orm/log.entity";
import { Admin } from "src/model/orm/admin.entity";
import {Employee} from "../../model/orm/employee.entity";

@Controller('admin/auth-logs')
export class LogsController {
    constructor (private logsService: LogsService) {}
    
    @UseGuards(AdminsGuard)
    @Post("admins")
    public admins(): Promise<IAnswer<Admin[]>> {
        return this.logsService.admins();
    }

    @UseGuards(AdminsGuard)
    @Post("employees")
    public employees(): Promise<IAnswer<Employee[]>> {
        return this.logsService.employees();
    }

    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Log[]>> {
        return this.logsService.chunk(dto);
    }

}
