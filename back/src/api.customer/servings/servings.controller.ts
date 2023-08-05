import { Controller, Post, Body } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { ServingsService } from "./servings.service";
import { IGetAll } from "src/model/dto/getall.interface";
import { IServing } from "./dto/serving.interface";

@Controller('customer/servings')
export class ServingsController {
    constructor (private servingsService: ServingsService) {}            

    // get all    
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<IServing[]>> {
        return this.servingsService.all(dto);
    }   
}
