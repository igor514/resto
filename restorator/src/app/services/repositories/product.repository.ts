import { Injectable } from '@angular/core';
import { Product } from '../../model/orm/product.model';
import { DataService } from '../data.service';
import { IProductUpdatePos } from 'src/app/model/dto/product.updatepos.interface';
import { Repository2 } from './_repository2';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class ProductRepository extends Repository2 {    
    //public filterCatId: number = null;    
    //public filterNameCode: string = "";    
    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "product";                    
    }    

    public loadAll(sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<Product[]> {
        return new Promise((resolve, reject) => {            
            /*const dto: IGetChunk = {                
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,        
                filter: {cat_id: this.filterCatId, nameCode: this.filterNameCode},
            };*/
            const dto: IGetAll = {sortBy, sortDir, filter};
            this.dataService.productsAll(dto).subscribe(res => {
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

    public loadOne(id: number): Promise<Product> {
        return new Promise((resolve, reject) => this.dataService.productsOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Product().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }    

    public create(x: Product): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public update(x: Product): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public updatePositions(dto: IProductUpdatePos[]): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.productsUpdatePositions(dto).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }
}
