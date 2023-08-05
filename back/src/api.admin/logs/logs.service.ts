import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {APIService} from "../../common/api.service";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {Sortdir} from "src/model/sortdir.type";
import {Log} from "../../model/orm/log.entity";
import {Admin} from "src/model/orm/admin.entity";
import {Employee} from "../../model/orm/employee.entity";

@Injectable()
export class LogsService extends APIService {
    constructor(
        @InjectRepository(Log) private logRepository: Repository<Log>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {
        super();
    }

    public async admins(): Promise<IAnswer<Admin[]>> {
        try {
            const admins = await this.adminRepository.find({select: ['id', 'name']})
            return {
                statusCode: 200,
                data: admins
            }
        } catch (err) {
            let errTxt: string = `Error in LogsService.admins: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async employees(): Promise<IAnswer<Employee[]>> {
        try {
            const employees = await this.employeeRepository.find({select: ['id', 'name']})
            return {
                statusCode: 200,
                data: employees
            }
        } catch (err) {
            let errTxt: string = `Error in LogsService.employees: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Log[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Log[] = await this.logRepository.find(
                {
                    where: filter,
                    relations: ['admin', 'employee'],
                    order: {[sortBy]: sortDir},
                    take: q,
                    skip: from
                }
            );
            data.forEach(item => {
                if (item.admin) {
                    const {id, name, ...rest} = item.admin
                    item.admin = {id, name} as Admin
                } else if (item.employee) {
                    const {id, name, ...rest} = item.employee
                    item.employee = {id, name} as Employee
                }
            })
            let allLength: number = await this.logRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in LogsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
