import {Controller, Param, Post, Body, UseGuards} from "@nestjs/common";
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {WSService} from "./wsservers.service";
import {WSServer} from "../../model/orm/wsserver.entity";
import {IWSServerUpdate} from "./dto/wsserver.update.interface";
import {IWSServerCreate} from "./dto/wsserver.create.interface";
import {IGetAll} from "src/model/dto/getall.interface";
import {AdminsGuard} from "src/common/guards/admins.guard";

@Controller('admin/wsservers')
export class WSServersController {
    constructor(private wsService: WSService) {
    }

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<WSServer[]>> {
        return this.wsService.all(dto);
    }

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<WSServer[]>> {
        return this.wsService.chunk(dto);
    }

    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<WSServer>> {
        return this.wsService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IWSServerCreate): Promise<IAnswer<void>> {
        return this.wsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IWSServerUpdate): Promise<IAnswer<void>> {
        return this.wsService.update(dto);
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.wsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.wsService.deleteBulk(ids);
    }
}
