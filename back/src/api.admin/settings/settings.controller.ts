import { Controller, Param, Post, Body, Delete, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { SettingsService } from "./settings.service";
import { Setting } from "src/model/orm/setting.entity";
import { ISettingCreate } from "./dto/setting.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/settings')
export class SettingsController {
    constructor (private settingsService: SettingsService) {}
    
    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Setting[]>> {
        return this.settingsService.all(dto);
    } 

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Setting[]>> {
        return this.settingsService.chunk(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.settingsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.settingsService.deleteBulk(ids);
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: ISettingCreate): Promise<IAnswer<void>> {
        return this.settingsService.create(dto);
    }
}
