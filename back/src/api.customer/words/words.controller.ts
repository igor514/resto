import { Body, Controller, Param, Post } from "@nestjs/common";

import { IAnswer } from 'src/model/dto/answer.interface';
import { WordsService } from "./words.service";
import { Words } from "src/model/words.type";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('customer/words')
export class WordsController {
    constructor (private wordsService: WordsService) {}    

    // get all    
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Words>> {
        return this.wordsService.all(dto);
    }    
}
