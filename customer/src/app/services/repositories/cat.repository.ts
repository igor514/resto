import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { ICat } from 'src/app/model/orm/cat.interface';

@Injectable()
export class CatRepository extends Repository<ICat> {    
    public filterRestaurantId: number = null;    
    
    constructor(protected dataService: DataService) {        
        super();        
        this.allSortBy = "pos";        
    }        
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {    
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,
                filter: {restaurant_id: this.filterRestaurantId},                    
            };
            this.dataService.catsAll(dto).subscribe(res => {
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

    public loadOne(id: number): Promise<ICat> {
        return new Promise((resolve, reject) => this.dataService.catsOne(id).subscribe(res => res.statusCode === 200 ? resolve(res.data) : reject(res.statusCode), err => reject(err.message)));
    }
}
