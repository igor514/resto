import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Mailtemplate } from "../../model/orm/mailtemplate.entity";
import { IMailtemplateCreate } from "./dto/mailtemplate.create.interface";
import { IMailtemplateUpdate } from "./dto/mailtemplate.update.interface";
import { Sortdir } from "src/model/sortdir.type";

@Injectable()
export class MailtemplatesService extends APIService {
    constructor (@InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>) {
        super();
    }      
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Mailtemplate[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Mailtemplate[] = await this.mailtemplateRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.mailtemplateRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in MailtemplatesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Mailtemplate>> {
        try {
            let data: Mailtemplate = await this.mailtemplateRepository.findOne({where: {id}, relations: ["translations"]});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in MailtemplatesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IMailtemplateCreate): Promise<IAnswer<void>> {        
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Mailtemplate = this.mailtemplateRepository.create(dto);
            await this.mailtemplateRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in MailtemplatesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IMailtemplateUpdate): Promise<IAnswer<void>> {
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }  
                       
            let x: Mailtemplate = this.mailtemplateRepository.create(dto);
            await this.mailtemplateRepository.save(x);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in MailtemplatesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.mailtemplateRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in MailtemplatesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.mailtemplateRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in MailtemplatesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
