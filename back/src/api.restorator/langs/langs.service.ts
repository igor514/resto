import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { Lang } from "../../model/orm/lang.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetAll } from "src/model/dto/getall.interface";
import { Sortdir } from "src/model/sortdir.type";

@Injectable()
export class LangsService extends APIService {
    constructor (@InjectRepository(Lang) private langRepository: Repository<Lang>) {
        super();
    } 
    
    public async all(dto: IGetAll): Promise<IAnswer<Lang[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";        

        try {
            let data: Lang[] = await this.langRepository.find({where: {active: true}, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
