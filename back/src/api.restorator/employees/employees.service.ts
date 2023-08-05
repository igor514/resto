import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Employee } from "src/model/orm/employee.entity";
import { IEmployeeAuthData } from "./dto/employee.authdata.interface";
import { IEmployeeLogin } from "./dto/employee.login.interface";
import { IEmployeeLoginByEmail } from "./dto/employee.loginbyemail.interface";
import { Setting } from "src/model/orm/setting.entity";
import { IRestaurant } from "./dto/restaurant.interface";
import { IEmployee } from "./dto/employee.interface";
import { IEmployeeSetStatus } from "./dto/employee.setstatus.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IEmployeeConfirm } from "./dto/employee.confirm.interface";
import { IEmployeeCreate } from "src/api.admin/employees/dto/employee.create.interface";
import * as bcrypt from "bcrypt";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { IEmployeeUpdate } from "./dto/employee.update.interface";
import { IEmployeeUpdatePassword } from "./dto/employee.updatepassword.interface";
import { Lang } from "src/model/orm/lang.entity";
import { EmployeeStatusesService } from "../employee.statuses/employee.statuses.service";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class EmployeesService extends APIService {
    constructor (
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        private jwtService: JwtService,               
        private employeeStatusesService: EmployeeStatusesService,
    ) {
        super();
    }

    // обычный логин
    public async login(dto: IEmployeeLogin): Promise<IAnswer<IEmployeeAuthData>> {
        try {            
            let employee: IEmployee = await this.validateEmployee(dto.email, dto.password);

            if (!employee || !employee.restaurant || !employee.restaurant.active) {
                return {statusCode: 401, error: "Unauthorized"};               
            }             

            employee.restaurant.daysleft = await this.getRestaurantDaysleft(employee.restaurant);
            const payload: Object = {username: employee.email, id: employee.id};
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), employee}};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.login: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    // логин по email через сторонние сервисы (google и др.)
    public async loginByEmail(dto: IEmployeeLoginByEmail): Promise<IAnswer<IEmployeeAuthData>> {
        try {
            let employee: IEmployee = await this.getEmployeeByEmail(dto.email);
            
            if (!employee || !employee.restaurant || !employee.restaurant.active) {
                return {statusCode: 401, error: "Unauthorized"};
            }

            employee.restaurant.daysleft = await this.getRestaurantDaysleft(employee.restaurant);
            const payload: Object = {username: employee.email, id: employee.id};    
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), employee}};            
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.loginByEmail: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // установка статуса сотрудника
    public async setStatus(dto: IEmployeeSetStatus): Promise<IAnswer<void>> {
        try {
            let employee = await this.employeeRepository.findOne({where: {id: dto.employee_id}});

            if (!employee) {
                return {statusCode: 404, error: "employee not found"};
            }

            employee.employee_status_id = dto.employee_status_id;
            await this.employeeRepository.save(employee);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.setStatus: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
    
    // проверка актуальности аккаунта и подгрузка актуальных данных
    // здесь мы не проверяем employee и employee.restaurant на существование и активность, это сделает EmployeeGuard
    public async check(id: number): Promise<IAnswer<IEmployee>> { 
        try {                                    
            let employee: IEmployee = await this.getEmployeeById(id);            
            employee.restaurant ? employee.restaurant.daysleft = await this.getRestaurantDaysleft(employee.restaurant) : null;
            return {statusCode: 200, data: employee};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.check: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // проверка пароля для запароленных форм подтверждения
    public async confirm(dto: IEmployeeConfirm): Promise<IAnswer<void>> {
        try {
            let employee: Employee = await this.employeeRepository
                .createQueryBuilder("employee")
                .addSelect("employee.password")
                .where({id: dto.id})
                .getOne();      
        
            if (!employee) {
                return {statusCode: 404};
            }

            let passwordOk: boolean = await this.comparePassHash(dto.password, employee.password);

            if (!passwordOk) {
                return {statusCode: 401};
            }

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.confirm: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // фрагмент
    public async chunk(dto: IGetChunk): Promise<IAnswer<IEmployee[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            let filter: string = "TRUE"; 

            if (dto.filter.created_at[0]) {
                const from: string = this.mysqlDate(new Date(dto.filter.created_at[0]));
                const to: string = dto.filter.created_at[1] ? this.mysqlDate(new Date(dto.filter.created_at[1])) : from;
                filter += ` AND e.created_at BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
            }

            if (dto.filter.name) {
                filter += ` AND LOWER(e.name) LIKE LOWER('%${dto.filter.name}%')`;
            }

            if (dto.filter.restaurant_id) {
                filter += ` AND e.restaurant_id = '${dto.filter.restaurant_id}'`;
            }

            const query = this.employeeRepository.createQueryBuilder("e").where(filter);
            const langs: Lang[] = await this.langRepository.find({where: {active: true}});
            const data: Employee[] | IEmployee[] = await query
                .leftJoinAndSelect("e.status", "status")
                .leftJoinAndSelect("status.translations", "translations")
                .orderBy({[`e.${sortBy}`]: sortDir})
                .take(q)
                .skip(from)
                .getMany();

            for (let x of data) {                
                x.status = this.employeeStatusesService.buildMlStatus((x as Employee).status, langs);                                
            }
        
            const allLength: number = await query.getCount();
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // удаление
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

    // создание
    public async create(dto: IEmployeeCreate): Promise<IAnswer<void>> {        
        try {            
            const employee = await this.employeeRepository.findOne({where: {email: dto.email}});

            if (employee) {
                return {statusCode: 409, error: "email exists"};
            }

            const restaurant = await this.restaurantRepository.findOne({where: {id: dto.restaurant_id}});

            if (!restaurant) {
                return {statusCode: 404, error: "restaurant not found"};
            }
            
            const x: Employee = this.employeeRepository.create(dto);
            x.password = bcrypt.hashSync(x.password, 10);
            await this.employeeRepository.save(x);
            // charge restaurant
            const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;  
            const price: number = strPrice ? parseFloat(strPrice) : 0;
            restaurant.money -= price;
            await this.restaurantRepository.save(restaurant);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    // загрузка одного элемента
    public async one(id: number): Promise<IAnswer<IEmployee>> {
        try {
            let data: IEmployee = await this.employeeRepository.findOne({where: {id}});
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "employee not found"};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // обновление
    public async update(dto: IEmployeeUpdate): Promise<IAnswer<void>> {
        try {
            const employee = await this.employeeRepository.findOne({where: {email: dto.email, id: Not(dto.id)}});

            if (employee) {
                return {statusCode: 409, error: "email exists"};
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

    // смена пароля
    public async updatePassword(dto: IEmployeeUpdatePassword): Promise<IAnswer<void>> {
        try {
            let employee: Employee = await this.employeeRepository.findOne({where: {id: dto.id}});

            if (!employee) {
                return {statusCode: 404, error: "employee not found"}; 
            }

            employee.password = bcrypt.hashSync(dto.password, 10);
            await this.employeeRepository.save(employee);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.updatePassword: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // загрузка всех
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

    ///////////////////////////////
    private getEmployeeByEmail(email: string): Promise<IEmployee> {
        return this.employeeRepository
            .createQueryBuilder("employee")
            .leftJoinAndSelect("employee.restaurant", "restaurant")
            .leftJoinAndSelect("restaurant.currency", "currency")
            .leftJoinAndSelect("restaurant.type", "type")
            .leftJoinAndSelect("type.translations", "type.translations")
            .loadRelationCountAndMap("restaurant.employees_q", "restaurant.employees")
            .where({email})
            .getOne();
    }

    private getEmployeeById(id: number): Promise<IEmployee> {
        return this.employeeRepository
            .createQueryBuilder("employee")
            .leftJoinAndSelect("employee.restaurant", "restaurant")
            .leftJoinAndSelect("restaurant.currency", "currency")
            .leftJoinAndSelect("restaurant.type", "type")
            .leftJoinAndSelect("type.translations", "ttranslations")
            .loadRelationCountAndMap("restaurant.employees_q", "restaurant.employees")
            .where({id})
            .getOne();
    }    

    private async validateEmployee(email: string, password: string): Promise<IEmployee> {
        let employee: Employee = await this.employeeRepository
            .createQueryBuilder("employee")
            .addSelect("employee.password")
            .leftJoinAndSelect("employee.restaurant", "restaurant")
            .leftJoinAndSelect("restaurant.currency", "currency")
            .leftJoinAndSelect("restaurant.type", "type")
            .leftJoinAndSelect("type.translations", "type.translations")
            .loadRelationCountAndMap("restaurant.employees_q", "restaurant.employees")
            .where({email})
            .getOne();      
        
        if (employee && await this.comparePassHash(password, employee.password)) {            
            delete employee.password;            
            return employee;
        } else {            
            return null;
        }
    }

    private async getRestaurantDaysleft(r: IRestaurant): Promise<number> {        
        const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;
        const price: number = strPrice ? parseFloat(strPrice) : 999999999;

        return Math.floor(r.money / (price * r.employees_q));
    }    
}