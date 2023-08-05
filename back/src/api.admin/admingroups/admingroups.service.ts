import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { Admingroup } from "../../model/orm/admingroup.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetAll } from "../../model/dto/getall.interface";
import { Sortdir } from "src/model/sortdir.type";

@Injectable()
export class AdmingroupsService extends APIService {
    constructor (@InjectRepository(Admingroup) private admingroupRepository: Repository<Admingroup>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Admingroup[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Admingroup[] = await this.admingroupRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in AdmingroupsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
