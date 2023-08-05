import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Hall } from '../../model/orm/hall.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class HallRepository extends Repository<Hall> {
    public schema: string = "hall";        
    public allSortBy: string = "pos";
    public chunkSortBy: string = "pos";    
    public filterRestaurantId: number = null;    
    
    constructor(protected dataService: DataService) {
        super(dataService);
    }        
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,                    
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

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {};
            this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter,                        
            };
            this.dataService.hallsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Hall().build(d)) : [];
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

    public loadOne(id: number): Promise<Hall> {
        return new Promise((resolve, reject) => {
            this.dataService.hallsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Hall = new Hall().build(res.data);
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
            this.dataService.hallsDelete(id).subscribe(res => {
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
            this.dataService.hallsDeleteBulk(ids).subscribe(res => {
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

    public create(x: Hall): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.hallsCreate(x).subscribe(res => {
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

    public update(x: Hall): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.hallsUpdate(x).subscribe(res => {
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
