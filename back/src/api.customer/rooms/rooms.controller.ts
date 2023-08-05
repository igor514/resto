import { Controller, Param, Post } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { RoomsService } from "./rooms.service";
import { IRoom } from "./dto/room.interface";

@Controller('customer/rooms')
export class RoomsController {
    constructor (private roomsService: RoomsService) {}
    
    @Post("oneByCode/:code")
    public oneByCode(@Param("code") code: string): Promise<IAnswer<IRoom>> {
        return this.roomsService.oneByCode(code);
    }
    
    @Post("oneById/:id")
    public oneById(@Param("id") id: string): Promise<IAnswer<IRoom>> {
        return this.roomsService.oneById(parseInt(id));
    }
}
