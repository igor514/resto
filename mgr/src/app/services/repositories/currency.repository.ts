import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Currency } from '../../model/orm/currency.model';
import { IGetAll } from '../../model/dto/getall.interface';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class CurrencyRepository extends Repository<Currency> {
    public schema: string = "currency";        
    public allSortBy: string = "pos";
    public chunkSortBy: string = "pos";    

    constructor(
        protected dataService: DataService,        
    ) {
        super(dataService);
    } 
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,                    
            };
            this.dataService.currenciesAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Currency().build(d)) : [];                                    
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
            this.dataService.currenciesChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlChunk = res.data.length ? res.data.map(d => new Currency().build(d)) : [];
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

    public loadOne(id: number): Promise<Currency> {
        return new Promise((resolve, reject) => {
            this.dataService.currenciesOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Currency = new Currency().build(res.data);
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
            this.dataService.currenciesDelete(id).subscribe(res => {
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
            this.dataService.currenciesDeleteBulk(ids).subscribe(res => {
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

    public create(x: Currency): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.currenciesCreate(x).subscribe(res => {
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

    public update(x: Currency): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.currenciesUpdate(x).subscribe(res => {
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
