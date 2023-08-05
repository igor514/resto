import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { Hall } from '../../model/orm/hall.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class HallRepository2 extends Repository<Hall> {    
    public allSortBy: string = "pos";    
    public filterRestaurantId: number = null;    
    
    constructor(protected dataService: DataService) {
        super(dataService);
    }        
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,   
                filter: {restaurant_id: this.filterRestaurantId},
            };
            this.dataService.hallsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Hall().build(d)) : [];                                    
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
