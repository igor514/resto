import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { EmployeeStatus } from "../../model/orm/employee.status.entity";
import { IEmployeeStatusCreate } from "./dto/employee.status.create.interface";
import { IEmployeeStatusUpdate } from "./dto/employee.status.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class EmployeeStatusesService extends APIService {
    constructor (@InjectRepository(EmployeeStatus) private employeeStatusRepository: Repository<EmployeeStatus>) {
        super();
    }      
    
    public async all(dto: IGetAll): Promise<IAnswer<EmployeeStatus[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: EmployeeStatus[] = await this.employeeStatusRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["translations"]});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<EmployeeStatus[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: EmployeeStatus[] = await this.employeeStatusRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from, relations: ["translations"]});
            let allLength: number = await this.employeeStatusRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<EmployeeStatus>> {
        try {
            let data: EmployeeStatus = await this.employeeStatusRepository.findOne({where: {id}, relations: ["translations"]});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IEmployeeStatusCreate): Promise<IAnswer<void>> {        
        try { 
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }            
            
            let x: EmployeeStatus = this.employeeStatusRepository.create(dto);
            await this.employeeStatusRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IEmployeeStatusUpdate): Promise<IAnswer<void>> {
        try { 
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }  
                       
            let x: EmployeeStatus = this.employeeStatusRepository.create(dto);
            await this.employeeStatusRepository.save(x);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.employeeStatusRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.employeeStatusRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
