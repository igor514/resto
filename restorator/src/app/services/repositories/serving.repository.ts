import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { IServing } from 'src/app/model/orm/serving.interface';
import { Repository2 } from './_repository2';

@Injectable()
export class ServingRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);                
    }        
    
    public loadAll(sortBy: string = "pos", sortDir: number = 1): Promise<IServing[]> {
        return new Promise((resolve, reject) => {    
            const dto: IGetAll = {sortBy, sortDir};
            this.dataService.servingsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {                    
                    resolve(res.data);
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });                        
        });
    }    
}
