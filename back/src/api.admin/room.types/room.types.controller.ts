import {Controller, Param, Post, Body, UseGuards} from "@nestjs/common";

import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {RoomTypesService} from "./room.types.service";
import {IRoomTypeUpdate} from "./dto/room.types.update.interface";
import {IRoomTypeCreate} from "./dto/room.types.create.interface";
import {IGetAll} from "src/model/dto/getall.interface";
import {AdminsGuard} from "src/common/guards/admins.guard";
import {RoomType} from "../../model/orm/room.type.entity";

@Controller('admin/room-types')
export class RoomTypesController {
    constructor(private roomTypeService: RoomTypesService) {
    }

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<RoomType[]>> {
        return this.roomTypeService.all(dto);
    }

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<RoomType[]>> {
        return this.roomTypeService.chunk(dto);
    }

    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<RoomType>> {
        return this.roomTypeService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IRoomTypeCreate): Promise<IAnswer<void>> {
        return this.roomTypeService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IRoomTypeUpdate): Promise<IAnswer<void>> {
        return this.roomTypeService.update(dto);
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.roomTypeService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.roomTypeService.deleteBulk(ids);
    }
}
