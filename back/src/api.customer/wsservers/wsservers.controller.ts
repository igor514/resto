import {Controller, Post, Body} from "@nestjs/common";
import {IAnswer} from 'src/model/dto/answer.interface';
import {WSServer} from "../../model/orm/wsserver.entity";
import {IGetAll} from "src/model/dto/getall.interface";
import {WSServersService} from "../../common/ws-server.service";

@Controller('customer/wsservers')
export class WSServersController {
    constructor(private wsserversService: WSServersService) {}

    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<WSServer[]>> {
        return this.wsserversService.all(dto);
    }
}
