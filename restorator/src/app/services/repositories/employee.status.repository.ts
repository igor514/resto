import { Injectable } from '@angular/core';
import { EmployeeStatus } from '../../model/orm/employee.status.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';

@Injectable()
export class EmployeeStatusRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);        
    }
    
    public loadAll(sortBy: string = "pos", sortDir: number = 1): Promise<EmployeeStatus[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy, sortDir};
            this.dataService.employeeStatusesAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {                    
                    resolve(res.data.map(d => new EmployeeStatus().build(d)));
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
