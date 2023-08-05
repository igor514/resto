import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { APIService } from "../../common/api.service";
import { Cat } from "../../model/orm/cat.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class CatsService extends APIService {
    constructor (@InjectRepository(Cat) private catRepository: Repository<Cat>) {
        super();
    }   
    
    public async all(dto: IGetAll): Promise<IAnswer<Cat[]>> {
        try {
            let sortBy: string = dto.sortBy;
            let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let filter: any = dto.filter;
            filter.active = true;
            let data: Cat[] = await this.catRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["icon"]});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CatsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    

    public async one(id: number): Promise<IAnswer<Cat>> {
        try {
            let data: Cat = await this.catRepository.findOne({where: {id, active: true}});
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "cat not found"};
        } catch (err) {
            let errTxt: string = `Error in CatsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }      
}
