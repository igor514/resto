import { Controller, Post, Body } from "@nestjs/common";
import { ISocketMsg } from "src/dto/socket.msg.interface";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor (private appService: AppService) {}            
    
    @Post("translate")
    public translate(@Body() msg: ISocketMsg): number {
        this.appService.translate(msg);
        return 200;
    }    
}
