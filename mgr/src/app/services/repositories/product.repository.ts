import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Product } from '../../model/orm/product.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class ProductRepository extends Repository<Product> {
    public schema: string = "product";        
    public allSortBy: string = "name";
    public chunkSortBy: string = "name";    
    public filterRestaurantId: number = null;    
    public filterCatId: number = null;    
    
    constructor(protected dataService: DataService) {
        super(dataService);
    }        
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,                    
            };
            this.dataService.productsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Product().build(d)) : [];                                    
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
            this.filterCatId ? filter.cat_id = this.filterCatId : null;
            this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter,
            };
            this.dataService.productsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Product().build(d)) : [];
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

    public loadOne(id: number): Promise<Product> {
        return new Promise((resolve, reject) => {
            this.dataService.productsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    let x: Product = new Product().build(res.data);
                    resolve(x);
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
            this.dataService.productsDelete(id).subscribe(res => {
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
            this.dataService.productsDeleteBulk(ids).subscribe(res => {
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

    public create(x: Product): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.productsCreate(x).subscribe(res => {
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

    public update(x: Product): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.productsUpdate(x).subscribe(res => {
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
