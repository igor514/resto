import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { ServingsService } from "./servings.service";
import { Serving } from "../../model/orm/serving.entity";
import { IServingUpdate } from "./dto/serving.update.interface";
import { IServingCreate } from "./dto/serving.create.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('admin/servings')
export class ServingsController {
    constructor (private servingsService: ServingsService) {}            

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Serving[]>> {
        return this.servingsService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Serving[]>> {
        return this.servingsService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Serving>> {
        return this.servingsService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IServingCreate): Promise<IAnswer<void>> {
        return this.servingsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IServingUpdate): Promise<IAnswer<void>> {
        return this.servingsService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.servingsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.servingsService.deleteBulk(ids);
    }
}
