import { Controller, Param, Post, Body } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { CatsService } from "./cats.service";
import { Cat } from "../../model/orm/cat.entity";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('customer/cats')
export class CatsController {
    constructor (private catsService: CatsService) {}            

    // get all    
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Cat[]>> {
        return this.catsService.all(dto);
    }      
    
    // get one    
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Cat>> {
        return this.catsService.one(parseInt(id));
    }    
}
