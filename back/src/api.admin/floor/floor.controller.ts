import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { FloorService } from "./floor.service";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";
import { Floor } from "src/model/orm/floor.entity";
import { IFloorCreate } from "./dto/floor.create.interface";
import { IFloorUpdate } from "./dto/floor.update.interface";

@Controller('admin/floors')
export class FloorController {
    constructor (private floorService: FloorService) {}            

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Floor[]>> {
        return this.floorService.all(dto);
    }    

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Floor[]>> {
        return this.floorService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Floor>> {
        return this.floorService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IFloorCreate): Promise<IAnswer<void>> {
        return this.floorService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IFloorUpdate): Promise<IAnswer<void>> {
        return this.floorService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.floorService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.floorService.deleteBulk(ids);
    }
}
