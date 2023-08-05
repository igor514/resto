import { Controller, Post, Body } from "@nestjs/common";

import { LangsService } from "./langs.service";
import { IGetAll } from "src/model/dto/getall.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Lang } from "src/model/orm/lang.entity";

@Controller('restorator/langs')
export class LangsController {
    constructor (private langsService: LangsService) {}    

    // get all    
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Lang[]>> {
        return this.langsService.all(dto);
    }    
}
