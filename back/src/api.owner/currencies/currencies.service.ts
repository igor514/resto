import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { APIService } from "../../common/api.service";
import { Currency } from "../../model/orm/currency.entity";
import { IGetAll } from "src/model/dto/getall.interface";
import { Sortdir } from "src/model/sortdir.type";

@Injectable()
export class CurrenciesService extends APIService {
    constructor (@InjectRepository(Currency) private currencyRepository: Repository<Currency>) {
        super();
    }    
    
    public async all(dto: IGetAll): Promise<IAnswer<Currency[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Currency[] = await this.currencyRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }     
}
