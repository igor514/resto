import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { LangsService } from "./langs.service";
import { Lang } from "../../model/orm/lang.entity";
import { ILangCreate } from "./dto/lang.create.interface";
import { ILangUpdate } from "./dto/lang.update.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/langs')
export class LangsController {
    constructor (private langsService: LangsService) {}    

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Lang[]>> {
        return this.langsService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Lang[]>> {
        return this.langsService.chunk(dto);
    }

    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Lang>> {
        return this.langsService.one(parseInt(id));
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.langsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.langsService.deleteBulk(ids);
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: ILangCreate): Promise<IAnswer<void>> {
        return this.langsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: ILangUpdate): Promise<IAnswer<void>> {
        return this.langsService.update(dto);
    }
}
