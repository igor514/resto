import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { APIService } from "../../common/api.service";
import { Serving } from "../../model/orm/serving.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import { IServing } from "./dto/serving.interface";
import { Lang } from "src/model/orm/lang.entity";

@Injectable()
export class ServingsService extends APIService {
    constructor (
        @InjectRepository(Serving) private servingRepository: Repository<Serving>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
    ) {
        super();
    }      
    
    public async all(dto: IGetAll): Promise<IAnswer<IServing[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const langs = await this.getLangs()
            const data: IServing[] = (await this.servingRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["translations"]}))
                .map(s => this.buildMlServing(s, langs));             
            return {statusCode: 200, data};
        } catch (err) {
            const errTxt: string = `Error in ServingsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  

    public async getLangs(): Promise<Lang[]> {
        return await this.langRepository.find({where: {active: true}});
    }
    public buildMlServing(serving: Serving, langs: Lang[]): IServing {
        const name = {};
        
        for (let l of langs) {
            name[l.slug] = serving.translations.find(t => t.lang_id === l.id)?.name;
        }
        
        return {id: serving.id, name};
    }
}
