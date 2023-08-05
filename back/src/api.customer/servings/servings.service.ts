import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { APIService } from "../../common/api.service";
import { Serving } from "../../model/orm/serving.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import { IServing } from "./dto/serving.interface";

@Injectable()
export class ServingsService extends APIService {
    constructor (@InjectRepository(Serving) private servingRepository: Repository<Serving>) {
        super();
    }      
    
    public async all(dto: IGetAll): Promise<IAnswer<IServing[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const data: IServing[] = (await this.servingRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["translations"]}))
                .map(s => ({
                    id: s.id,
                    name: s.translations.find(t => t.lang_id === dto.lang_id)?.name,
                }));             
            return {statusCode: 200, data};
        } catch (err) {
            const errTxt: string = `Error in ServingsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
