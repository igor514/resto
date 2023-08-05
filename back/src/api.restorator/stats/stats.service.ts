import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { Employee } from "src/model/orm/employee.entity";
import { Hall } from "src/model/orm/hall.entity";
import { Order, OrderStatus } from "src/model/orm/order.entity";
import { Table } from "src/model/orm/table.entity";
import { Repository } from "typeorm";
import { IEmployeeSum } from "./dto/employee.sum.interface";
import { IGetMonthStats } from "./dto/get.month.stats.interface";
import { IGetYearStats } from "./dto/get.year.stats.interface";
import { ITableSum } from "./dto/table.sum.interface";

@Injectable()
export class StatsService extends APIService {
    constructor(
        @InjectRepository(Hall) private hallRepository: Repository<Hall>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {
        super();
    }

    public async tableSumsMonthly(dto: IGetMonthStats): Promise<IAnswer<ITableSum[]>> {
        try {
            const halls = await this.hallRepository.find({where: {restaurant_id: dto.restaurant_id}, relations: ["tables"]});
            let tables: Table[] = [];

            for (let h of halls) {
                tables = [...tables, ...h.tables];
            }

            tables.sort((a, b) => a.no - b.no);
            const data: ITableSum[] = [];            

            for (let t of tables) {
                const filter = `orders.table_id='${t.id}' AND EXTRACT(MONTH FROM orders.created_at)='${dto.month}' AND EXTRACT(YEAR FROM orders.created_at)='${dto.year}' AND orders.status='${OrderStatus.Completed}'`;
                const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);       
                data.push({no: t.no, sum});
            }

            return {statusCode: 200, data};
        } catch (err) {
            const errTxt: string = `Error in StatsService.tableSumsMonthly: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async employeeSumsMonthly(dto: IGetMonthStats): Promise<IAnswer<IEmployeeSum[]>> {
        try {
            const employees = await this.employeeRepository.find({where: {restaurant_id: dto.restaurant_id}});
            const data: IEmployeeSum[] = [];

            for (let e of employees) {
                const filter = `orders.employee_id='${e.id}' AND EXTRACT(MONTH FROM orders.created_at)='${dto.month}' AND EXTRACT(YEAR FROM orders.created_at)='${dto.year}' AND orders.status='${OrderStatus.Completed}'`;
                const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);                
                data.push({name: e.name, sum});
            }

            return {statusCode: 200, data};            
        } catch (err) {
            const errTxt: string = `Error in StatsService.employeeSumsMonthly: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async yearly(dto: IGetYearStats): Promise<IAnswer<number[]>> {
        try {            
            if (dto.mode !== "sums" && dto.mode !== "orders") {
                return {statusCode: 400, error: "invalid mode"};
            }
            
            const xl: number[] = [];

            for (let month = 1; month <= 12; month++) {
                const filter = `orders.restaurant_id='${dto.restaurant_id}' AND EXTRACT(MONTH FROM orders.created_at)='${month}' AND EXTRACT(YEAR FROM orders.created_at)='${dto.year}' AND orders.status='${OrderStatus.Completed}'`;
                let x: number;

                if (dto.mode === "sums") {
                    x = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);                       
                } else {
                    x = await this.orderRepository.createQueryBuilder("orders").where(filter).getCount();         
                }               
                
                xl.push(x);                
            }

            return {statusCode: 200, data: xl};
        } catch (err) {
            const errTxt: string = `Error in StatsService.sumsYearly: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}