import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { EmployeeStatus } from '../../model/orm/employee.status.model';
import { IGetAll } from '../../model/dto/getall.interface';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class EmployeeStatusRepository extends Repository<EmployeeStatus> {
    public schema: string = "employeeStatus"; 
    public schemaMl: string = "employeeStatusTranslation";
    public allSortBy: string = "pos";
    public chunkSortBy: string = "pos";    

    constructor(protected dataService: DataService) {
        super(dataService);
    } 
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,                    
            };
            this.dataService.employeeStatusesAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new EmployeeStatus().build(d)) : [];                                    
                    resolve();
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
                
            });                        
        });
    }

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,                    
            };
            this.dataService.employeeStatusesChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlChunk = res.data.length ? res.data.map(d => new EmployeeStatus().build(d)) : [];
                    this.allLength = res.allLength;            
                    resolve();
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);
                
            });            
        });
    }

    public loadOne(id: number): Promise<EmployeeStatus> {
        return new Promise((resolve, reject) => {
            this.dataService.employeeStatusesOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: EmployeeStatus = new EmployeeStatus().build(res.data);
                        resolve(x);
                    } else {
                        reject("Object not found");
                    }                    
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
                
            });
        });
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.employeeStatusesDelete(id).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
                
            });
        });
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.employeeStatusesDeleteBulk(ids).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public create(x: EmployeeStatus): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.employeeStatusesCreate(x).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
                
            });
        });
    }

    public update(x: EmployeeStatus): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.employeeStatusesUpdate(x).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
                
            });
        });
    }
}
