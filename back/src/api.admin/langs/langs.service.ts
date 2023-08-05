import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { Lang } from "../../model/orm/lang.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { ILangCreate } from "./dto/lang.create.interface";
import { ILangUpdate } from "./dto/lang.update.interface";
import { IGetAll } from "src/model/dto/getall.interface";
import { Word } from "src/model/orm/word.entity";
import { WordTranslation } from "src/model/orm/word.translation.entity";
import { Sortdir } from "src/model/sortdir.type";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";
import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { EmployeeStatusTranslation } from "src/model/orm/employee.status.translation.entity";
import { Icon } from "src/model/orm/icon.entity";
import { IconTranslation } from "src/model/orm/icon.translation.entity";
import { Serving } from "src/model/orm/serving.entity";
import { ServingTranslation } from "src/model/orm/serving.translation.entity";

@Injectable()
export class LangsService extends APIService {
    constructor (
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        @InjectRepository(Word) private wordRepository: Repository<Word>,
        @InjectRepository(WordTranslation) private wordTranslationRepository: Repository<WordTranslation>,
        @InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>,
        @InjectRepository(MailtemplateTranslation) private mailtemplateTranslationRepository: Repository<MailtemplateTranslation>,                
        @InjectRepository(EmployeeStatus) private employeeStatusRepository: Repository<EmployeeStatus>,
        @InjectRepository(EmployeeStatusTranslation) private employeeStatusTranslationRepository: Repository<EmployeeStatusTranslation>,                
        @InjectRepository(Icon) private iconRepository: Repository<Icon>,
        @InjectRepository(IconTranslation) private iconTranslationRepository: Repository<IconTranslation>,
        @InjectRepository(Serving) private servingRepository: Repository<Serving>,
        @InjectRepository(ServingTranslation) private servingTranslationRepository: Repository<ServingTranslation>,
    ) {
        super();
    } 
    
    public async all(dto: IGetAll): Promise<IAnswer<Lang[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Lang[] = await this.langRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  

    public async chunk(dto: IGetChunk): Promise<IAnswer<Lang[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Lang[] = await this.langRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.langRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in LangsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Lang>> {
        try {
            let data: Lang = await this.langRepository.findOne({where: {id}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.langRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.langRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: ILangCreate): Promise<IAnswer<void>> {        
        try {            
            if (!dto.slug) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Lang = this.langRepository.create(dto);
            await this.langRepository.save(x);
            await this.rebuildSlugable(x);
            await this.rebuildMultilangEntities(x.id);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
    
    public async update(dto: ILangUpdate): Promise<IAnswer<void>> {
        try {
            if (!dto.slug) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Lang = this.langRepository.create(dto);
            await this.langRepository.save(x);       
            await this.rebuildSlugable(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }  
    
    private async rebuildSlugable(x: Lang): Promise<void> {
        if (x.slugable) {
            await this.langRepository.update({id: Not(x.id)}, {slugable: false});
        }
    }

    private async rebuildMultilangEntities(lang_id: number): Promise<void> {
        let wl: Word[] = await this.wordRepository.find();
        let wtl: WordTranslation[] = [];
        wl.forEach(w => wtl.push(this.wordTranslationRepository.create({word_id: w.id, lang_id})));        
        await this.wordTranslationRepository.save(wtl);

        let mtl: Mailtemplate[] = await this.mailtemplateRepository.find();
        let mttl: MailtemplateTranslation[] = [];
        mtl.forEach(mt => mttl.push(this.mailtemplateTranslationRepository.create({mailtemplate_id: mt.id, lang_id})));
        await this.mailtemplateTranslationRepository.save(mttl);  
        
        let esl: EmployeeStatus[] = await this.employeeStatusRepository.find();
        let estl: EmployeeStatusTranslation[] = [];
        esl.forEach(es => estl.push(this.employeeStatusTranslationRepository.create({employee_status_id: es.id, lang_id})));        
        await this.employeeStatusTranslationRepository.save(estl);

        let il: Icon[] = await this.iconRepository.find();
        let itl: IconTranslation[] = [];
        il.forEach(i => itl.push(this.iconTranslationRepository.create({icon_id: i.id, lang_id})));        
        await this.iconTranslationRepository.save(itl);

        let sl: Serving[] = await this.servingRepository.find();
        let stl: ServingTranslation[] = [];
        sl.forEach(s => stl.push(this.servingTranslationRepository.create({serving_id: s.id, lang_id})));
        await this.servingTranslationRepository.save(stl);
    }    
}
