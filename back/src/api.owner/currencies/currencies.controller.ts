import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IAnswer } from 'src/model/dto/answer.interface';
import { CurrenciesService } from "./currencies.service";
import { Currency } from "../../model/orm/currency.entity";
import { IGetAll } from "src/model/dto/getall.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('owner/currencies')
export class CurrenciesController {
    constructor (private currenciesService: CurrenciesService) {}  
    
    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Currency[]>> {
        return this.currenciesService.all(dto);
    }    
}
