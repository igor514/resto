import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Setting } from "src/model/orm/setting.entity";
import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { ISettingCreate } from "./dto/setting.create.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class SettingsService extends APIService {
    constructor (@InjectRepository(Setting) private settingRepository: Repository<Setting>) {
        super();
    }   
    
    public async all(dto: IGetAll): Promise<IAnswer<Setting[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Setting[] = await this.settingRepository.find({where: filter, order: {[sortBy]: sortDir}});            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Setting[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Setting[] = await this.settingRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.settingRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.settingRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.settingRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: ISettingCreate): Promise<IAnswer<void>> {        
        try {                        
            let x: Setting = this.settingRepository.create(dto);
            await this.settingRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }    
}
