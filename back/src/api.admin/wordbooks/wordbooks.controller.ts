import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { WordbooksService } from "./wordbooks.service";
import { Wordbook } from "../../model/orm/wordbook.entity";
import { IWordbookUpdate } from "./dto/wordbook.update.interface";
import { IWordbookCreate } from "./dto/wordbook.create.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/wordbooks')
export class WordbooksController {
    constructor (private wordbooksService: WordbooksService) {}        

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Wordbook[]>> {
        return this.wordbooksService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Wordbook>> {
        return this.wordbooksService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IWordbookCreate): Promise<IAnswer<void>> {
        return this.wordbooksService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IWordbookUpdate): Promise<IAnswer<void>> {
        return this.wordbooksService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.wordbooksService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.wordbooksService.deleteBulk(ids);
    }    
}
