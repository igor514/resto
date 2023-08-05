import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Admingroup } from '../../model/orm/admingroup.model';
import { DataService } from '../data.service';
import { IGetAll } from "../../model/dto/getall.interface";

@Injectable()
export class AdmingroupRepository extends Repository<Admingroup> {
    public schema: string = "admingroup";
    public allSortBy: string = "title";

    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,                    
            };
            this.dataService.admingroupsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Admingroup().build(d)) : [];                    
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
