import { Injectable } from '@angular/core';
import { Cat } from '../../model/orm/cat.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';
import { IChunk } from 'src/app/model/chunk.interface';

@Injectable()
export class CatRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "cat";        
    }        
    
    public loadAll(sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<Cat[]> {
        return new Promise((resolve, reject) => {    
            const dto: IGetAll = {sortBy, sortDir, filter};
            this.dataService.catsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {                    
                    resolve(res.data.map(d => new Cat().build(d)));
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });                        
        });
    }

    public loadChunk(part: number, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<IChunk<Cat>> {
        return new Promise((resolve, reject) => {            
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.catsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const chunk: IChunk<Cat> = {data: res.data.map(d => new Cat().build(d)), allLength: res.allLength};
                    resolve(chunk);
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }

    public loadOne(id: number): Promise<Cat> {
        return new Promise((resolve, reject) => this.dataService.catsOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Cat().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.catsDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }    

    public create(x: Cat): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.catsCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public update(x: Cat): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.catsUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }
}
