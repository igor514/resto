import { Injectable } from "@angular/core";
import { IChunk } from "src/app/model/chunk.interface";
import { IGetAll } from "src/app/model/dto/getall.interface";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { DataService } from "../data.service";
import { Repository2 } from "./_repository2";

@Injectable()
export class EmployeeRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);        
    } 
    
    public loadAll(sortBy: string = "name", sortDir: number = 1, filter: any = {}): Promise<Employee[]> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {sortDir, sortBy, filter};
            this.dataService.employeesAll(dto).subscribe(res => {
                if (res.statusCode === 200) {                    
                    resolve(res.data.map(d => new Employee().build(d)));
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });                        
        });
    }

    public loadChunk(part: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<IChunk<Employee>> {
        return new Promise((resolve, reject) => {                                    
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortDir, sortBy, filter};
            this.dataService.employeesChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const chunk: IChunk<Employee> = {data: res.data.map(d => new Employee().build(d)), allLength: res.allLength};
                    resolve(chunk);
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }

    public loadOne(id: number): Promise<Employee> {
        return new Promise((resolve, reject) => this.dataService.employeesOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Employee().build(res.data)) : reject(res.error), err => reject(err.message)));
    } 

    public update(x: Employee): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.employeesUpdate(x).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.employeesDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    } 

    public create(x: Employee): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.employeesCreate(x).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
    }
}