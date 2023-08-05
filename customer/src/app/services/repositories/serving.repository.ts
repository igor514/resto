import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { IServing } from 'src/app/model/orm/serving.interface';

@Injectable()
export class ServingRepository extends Repository<IServing> {    
    public lang_id: number = null;
    
    constructor(protected dataService: DataService) {        
        super();        
        this.allSortBy = "pos";        
    }        
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {    
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,
                lang_id: this.lang_id,
            };
            this.dataService.servingsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data;                                    
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
