import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetAll } from "src/model/dto/getall.interface";
import { IconsService } from "./icons.service";
import { Icon } from "src/model/orm/icon.entity";
import { IIconCreate } from "./dto/icon.create.interface";
import { IIconUpdate } from "./dto/icon.update.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/icons')
export class IconsController {
    constructor (private iconsService: IconsService) {}            

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Icon[]>> {
        return this.iconsService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Icon[]>> {
        return this.iconsService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Icon>> {
        return this.iconsService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IIconCreate): Promise<IAnswer<void>> {
        return this.iconsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IIconUpdate): Promise<IAnswer<void>> {
        return this.iconsService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.iconsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.iconsService.deleteBulk(ids);
    }
}
