import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { CatsService } from "./cats.service";
import { Cat } from "../../model/orm/cat.entity";
import { ICatUpdate } from "./dto/cat.update.interface";
import { ICatCreate } from "./dto/cat.create.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/cats')
export class CatsController {
    constructor (private catsService: CatsService) {}            

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Cat[]>> {
        return this.catsService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Cat[]>> {
        return this.catsService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Cat>> {
        return this.catsService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: ICatCreate): Promise<IAnswer<void>> {
        return this.catsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: ICatUpdate): Promise<IAnswer<void>> {
        return this.catsService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.catsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.catsService.deleteBulk(ids);
    }
}
