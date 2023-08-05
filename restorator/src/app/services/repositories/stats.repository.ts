import { Injectable } from "@angular/core";
import { IEmployeeSum } from "src/app/model/dto/stats/employee.sum.interface";
import { IGetMonthStats } from "src/app/model/dto/stats/get.month.stats.interface";
import { IGetYearStats } from "src/app/model/dto/stats/get.year.stats.interface";
import { ITableSum } from "src/app/model/dto/stats/table.sum.interface";
import { DataService } from "../data.service";

@Injectable()
export class StatsRepository {
    constructor(private dataService: DataService) {}

    public loadTableSumsMonthly(restaurant_id: number, month: number, year: number): Promise<ITableSum[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetMonthStats = {restaurant_id, month, year};
            this.dataService
                .statsTableSumsMonthly(dto)
                .subscribe(
                    res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    err => reject(err.message));
        });
    }

    public loadEmployeeSumsMonthly(restaurant_id: number, month: number, year: number): Promise<IEmployeeSum[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetMonthStats = {restaurant_id, month, year};
            this.dataService
                .statsEmployeeSumsMonthly(dto)
                .subscribe(
                    res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    err => reject(err.message));
        });
    }

    public loadYearly(restaurant_id: number, year: number, mode: string): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetYearStats = {restaurant_id, year, mode};
            this.dataService
                .statsYearly(dto)
                .subscribe(
                    res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    err => reject(err.message));
        });
    }    
}