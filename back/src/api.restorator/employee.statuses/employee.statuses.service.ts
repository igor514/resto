import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { APIService } from "../../common/api.service";
import { EmployeeStatus } from "../../model/orm/employee.status.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import { IEmployeeStatus } from "./dto/employee.status.interface";
import { Lang } from "src/model/orm/lang.entity";

@Injectable()
export class EmployeeStatusesService extends APIService {
    constructor (
        @InjectRepository(EmployeeStatus) private employeeStatusRepository: Repository<EmployeeStatus>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
    ) {
        super();
    }      
    
    public async all(dto: IGetAll): Promise<IAnswer<IEmployeeStatus[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const langs: Lang[] = await this.langRepository.find({where: {active: true}});
            const data: IEmployeeStatus[] = (await this.employeeStatusRepository.find({where: filter, order: {[sortBy]: sortDir}, relations: ["translations"]}))
                .map(x => this.buildMlStatus(x, langs));             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in EmployeeStatusesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  
    
    public buildMlStatus(status: EmployeeStatus, langs: Lang[]): IEmployeeStatus {
        if (!status) return null;
        
        return {
            id: status.id,
            color: status.color,
            pos: status.pos,
            name: this.translationsToObject(status.translations, "name", langs),
        };
    }
}
