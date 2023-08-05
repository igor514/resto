import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Currency } from "../../model/orm/currency.entity";
import { ICurrencyCreateDTO } from "./dto/currency.create.dto";
import { ICurrencyUpdateDTO } from "./dto/currency.update.dto";
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

    public async chunk(dto: IGetChunk): Promise<IAnswer<Currency[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Currency[] = await this.currencyRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.currencyRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Currency>> {
        try {
            let data: Currency = await this.currencyRepository.findOne({where: {id}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: ICurrencyCreateDTO): Promise<IAnswer<void>> {        
        try {    
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }
            
            let x: Currency = this.currencyRepository.create(dto);
            await this.currencyRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: ICurrencyUpdateDTO): Promise<IAnswer<void>> {
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }
                       
            let x: Currency = this.currencyRepository.create(dto);
            await this.currencyRepository.save(x);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.currencyRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.currencyRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CurrenciesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
