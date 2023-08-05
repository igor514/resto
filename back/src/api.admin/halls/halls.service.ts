import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { Hall } from "../../model/orm/hall.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IHallCreate } from "./dto/hall.create.interface";
import { IHallUpdate } from "./dto/hall.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import { Table } from "src/model/orm/table.entity";

@Injectable()
export class HallsService extends APIService {
    constructor (
        @InjectRepository(Hall) private hallRepository: Repository<Hall>,
        @InjectRepository(Table) private tableRepository: Repository<Table>,
    ) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Hall[]>> {       
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const halls: Hall[] = await this.hallRepository.find({where: filter, order: {[sortBy]: sortDir}});             

            for (let h of halls) {
                h.tables = await this.tableRepository.find({where: {hall_id: h.id}, order: {no: "ASC"}});
            }

            return {statusCode: 200, data: halls};
        } catch (err) {
            let errTxt: string = `Error in HallsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 

    public async chunk(dto: IGetChunk): Promise<IAnswer<Hall[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Hall[] = await this.hallRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from, relations: ["restaurant"]});
            let allLength: number = await this.hallRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in HallsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Hall>> {
        try {
            let data: Hall = await this.hallRepository
                .createQueryBuilder("halls")
                .leftJoinAndSelect("halls.tables", "tables")
                .where({id})
                .orderBy({"tables.no": "ASC"})
                .getOne();
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in HallsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.hallRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in HallsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.hallRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in HallsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IHallCreate): Promise<IAnswer<void>> {        
        try {            
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Hall = this.hallRepository.create(dto);            
            await this.hallRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in HallsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
    
    public async update(dto: IHallUpdate): Promise<IAnswer<void>> {
        try {
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }            

            let x: Hall = this.hallRepository.create(dto);
            await this.hallRepository.save(x);  
            await this.deleteUnbindedTables();     
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in HallsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }  
    
    private deleteUnbindedTables(): Promise<DeleteResult> {
        return this.tableRepository.delete({hall_id: IsNull()});
    }  
}
