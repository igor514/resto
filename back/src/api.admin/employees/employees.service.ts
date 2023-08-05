import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

import {APIService} from "../../common/api.service";
import {Employee} from "../../model/orm/employee.entity";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IEmployeeCreate} from "./dto/employee.create.interface";
import {IEmployeeUpdate} from "./dto/employee.update.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";

@Injectable()
export class EmployeesService extends APIService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        private readonly jwtService: JwtService,
    ) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Employee[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Employee[] = await this.employeeRepository.find({where: filter, order: {[sortBy]: sortDir}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Employee[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Employee[] = await this.employeeRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["restaurant"]
            });
            let allLength: number = await this.employeeRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Employee>> {
        try {
            let data: Employee = await this.employeeRepository.findOne({where: {id}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.employeeRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.employeeRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IEmployeeCreate): Promise<IAnswer<void>> {
        try {
            if (!dto.name || !dto.password || !dto.email) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: Employee = this.employeeRepository.create(dto);
            x.password = bcrypt.hashSync(x.password, 10);
            await this.employeeRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IEmployeeUpdate): Promise<IAnswer<void>> {
        try {
            if (!dto.name || !dto.email) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: Employee = this.employeeRepository.create(dto);

            if (x.password) {
                x.password = bcrypt.hashSync(dto.password, 10);
            } else {
                delete x.password; // if we got empty or null password, then it will not change in DB
            }

            await this.employeeRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
