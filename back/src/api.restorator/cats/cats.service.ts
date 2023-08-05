import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Cat } from "../../model/orm/cat.entity";
import { ICatCreate } from "./dto/cat.create.interface";
import { ICatUpdate } from "./dto/cat.update.interface";
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
            let filter: Object = dto.filter;
            let data: Cat[] = await this.catRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["icon"]});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CatsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Cat[]>> {
        try {
            let sortBy: string = dto.sortBy;
            let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let from: number = dto.from;
            let q: number = dto.q;
            let filter: Object = dto.filter;
            let data: Cat[] = await this.catRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from, relations: ["icon"]});
            let allLength: number = await this.catRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in CatsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Cat>> {
        try {
            let data: Cat = await this.catRepository.findOne({where: {id}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CatsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: ICatCreate): Promise<IAnswer<void>> {        
        try { 
            let x: Cat = this.catRepository.create(dto);            
            await this.catRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CatsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: ICatUpdate): Promise<IAnswer<void>> {
        try { 
            let x: Cat = this.catRepository.create(dto);
            await this.catRepository.save(x);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CatsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.catRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CatsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }    
}
