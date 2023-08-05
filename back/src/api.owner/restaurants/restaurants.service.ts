import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {APIService} from "../../common/api.service";
import {Restaurant} from "../../model/orm/restaurant.entity";
import {Sortdir} from "src/model/sortdir.type";
import {IRestaurantCreate} from "./dto/restaurant.create.interface";
import {Employee} from "src/model/orm/employee.entity";
import {IRestaurantUpdate} from "./dto/restaurant.update.interface";
import {MailService} from "src/common/mail.service";
import {Admin} from "src/model/orm/admin.entity";
import {Setting} from "src/model/orm/setting.entity";
import {IRestaurant} from "./dto/restaurant.interface";
import {RestaurantFeeConfig} from "../../model/orm/restaurant.fee.config";
import {loadWithFees} from "../../utils/restaurants";
import {FeeService} from "../../common/fee.service";
import {dataSource} from "../../main";
import {db_name, db_schema} from "../../config/options";

@Injectable()
export class RestaurantsService extends APIService {
    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(RestaurantFeeConfig) private feeRepository: Repository<RestaurantFeeConfig>,
        private mailService: MailService,
        private feeService: FeeService,
    ) {
        super();
    }


    public async chunk(dto: IGetChunk): Promise<IAnswer<IRestaurant[]>> {
        try {
            const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;
            const price: number = strPrice ? parseFloat(strPrice) : 999999999;
            const sortBy: string = dto.sortBy !== "daysleft" ? `r.${dto.sortBy}` : dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const t_restaurants: string = `${db_name}.${db_schema}.vne_restaurants`;
            const t_employees: string = `${db_name}.${db_schema}.vne_employees`;
            const t_currencies: string = `${db_name}.${db_schema}.vne_currencies`
            let filterStatement: string = "TRUE";
            let havingStatement: string = "TRUE";

            if (dto.filter.active !== undefined) {
                filterStatement += dto.filter.active ? ` AND r.money >= 0` : ` AND r.money < 0`;
            }

            if (dto.filter.name) {
                filterStatement += ` AND LOWER(r.name) LIKE LOWER('%${dto.filter.name}%')`;
            }

            if (dto.filter.daysleft) {
                havingStatement += ` AND r.money / NULLIF(COUNT(DISTINCT e.id) * ${price}, 0) = '${dto.filter.daysleft}'`;
            }

            const mainStatement: string = `
                SELECT r.*,
                       c.symbol                                                          as currency,
                       CAST(COUNT(DISTINCT e.id) AS INT)                                 AS employees_q,
                       CAST(r.money / NULLIF(COUNT(DISTINCT e.id) * ${price}, 0) AS INT) AS daysleft
                FROM ${t_restaurants} AS r
                         LEFT JOIN ${t_employees} AS e ON r.id = e.restaurant_id
                         LEFT JOIN ${t_currencies} AS c ON r.currency_id = c.id
                WHERE ${filterStatement}
                GROUP BY r.id, currency
                HAVING ${havingStatement}
                ORDER BY ${sortBy} ${sortDir}
            `;
            const chunkStatement: string = `LIMIT ${q} OFFSET ${from}`;
            const countStatement: string = `SELECT CAST(COUNT(*) AS INT) AS count
                                            FROM (${mainStatement}) AS t`;
            const data: IRestaurant[] = await dataSource.manager.query(`${mainStatement} ${chunkStatement}`);
            const allLength: number = (await dataSource.manager.query(countStatement))[0]?.count || 0;

            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IRestaurantCreate): Promise<IAnswer<void>> {
        try {
            let employee = await this.employeeRepository.findOne({where: {email: dto.employees[0].email}});

            if (employee) {
                return {statusCode: 409, error: "employee email in use"};
            }

            let rawPassword = dto.employees[0].password;
            dto.employees[0].password = bcrypt.hashSync(dto.employees[0].password, 10);
            const {fees, ...rest} = dto
            let x: Restaurant = await this.restaurantRepository.save(rest)
            x = await this.restaurantRepository.findOne({
                where: {id: x.id},
                relations: ["currency", "employees", "lang"]
            });
            for (const f of fees) {
                let {secret_key} = f
                try {
                    secret_key = await this.feeService.validateFee(f)
                } catch (error) {
                    return {statusCode: 400, error}
                }
                await this.feeRepository.save(this.feeRepository.create({...f, restaurant_id: x.id, secret_key}))
            }

            // mail
            x.employees[0].password = rawPassword;
            this.mailService.mailEmployeeRestaurantCreated(x);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Restaurant>> {
        try {
            let data: Restaurant = await loadWithFees(id, this.restaurantRepository, this.feeRepository);
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "restaurant not found"};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IRestaurantUpdate): Promise<IAnswer<void>> {
        try {
            const {fees, id, ...rest} = dto
            for (let fee of fees) {
                let {secret_key} = fee
                try {
                    secret_key = await this.feeService.validateFee(fee)
                } catch (error) {
                    return {statusCode: 400, error}
                }
                await this.feeRepository.update({
                    payment_type: fee.payment_type,
                    restaurant_id: fee.restaurant_id
                }, {...fee, secret_key})
            }
            await this.restaurantRepository.update(id, rest);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.restaurantRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
