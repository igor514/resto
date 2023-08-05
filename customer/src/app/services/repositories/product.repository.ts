import { Injectable } from '@angular/core';
import { Repository } from './_repository';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IProduct } from 'src/app/model/orm/product.interface';

@Injectable()
export class ProductRepository extends Repository<IProduct> {        
    public filterCatId: number = null;    
    public filterRecommended: boolean = null;    
    
    constructor(protected dataService: DataService) {
        super();                
        this.chunkLength = 12;
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const filter: any = {};
            this.filterCatId !== null ? filter.cat_id = this.filterCatId : null;
            this.filterRecommended !== null ? filter.recommended = this.filterRecommended : null;
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.filterCatId !== null ? "pos" : "name",
                sortDir: this.chunkSortDir,
                filter,
            };
            this.dataService.productsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const data: IProduct[] = res.data;                      
                    res.data.forEach(d => d.ingredients.forEach(i => i.included = true)); // подготовка к заказу - по умолчанию ингредиенты должны быть выбраны
                    this.xlAll = this.chunkCurrentPart ? [...this.xlAll, ...data] : data;
                    this.allLength = res.allLength;    
                    this.exhausted = !this.allLength || this.chunkCurrentPart + 1 === Math.ceil(this.allLength / this.chunkLength);          
                    resolve();
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }

    public loadOne(id: number): Promise<IProduct> {
        return new Promise((resolve, reject) => this.dataService.productsOne(id).subscribe(
            res => {
                if (res.statusCode === 200) {
                    res.data.ingredients.forEach(i => i.included = true); // подготовка к заказу - по умолчанию ингредиенты должны быть выбраны
                    resolve(res.data);
                } else {
                    reject(res.statusCode)
                }                 
            }, 
            err => reject(err.message))
        );
    }
    
    public like(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const strLikes: string = localStorage.getItem("likes");
            const likes: number[] = strLikes ? JSON.parse(strLikes) : [];

            if (likes.includes(id)) {
                resolve(409);
            } else {
                likes.push(id);
                localStorage.setItem("likes", JSON.stringify(likes));
                this.dataService.productsLike(id).subscribe(res => resolve(res.statusCode), err => reject(err.message));
            }
        });
    }
}
