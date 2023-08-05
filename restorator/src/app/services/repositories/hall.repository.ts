import { Injectable } from '@angular/core';
import { Hall } from '../../model/orm/hall.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';
import { IChunk } from 'src/app/model/chunk.interface';

@Injectable()
export class HallRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);        
    }        
    
    public loadAll(sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<Hall[]> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {sortBy, sortDir, filter};
            this.dataService.hallsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {                    
                    resolve(res.data.map(d => new Hall().build(d)));
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);                
            });                        
        });
    }

    public loadChunk(part: number, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<IChunk<Hall>> {
        return new Promise((resolve, reject) => {            
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.hallsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const chunk: IChunk<Hall> = {data: res.data.map(d => new Hall().build(d)), allLength: res.allLength};
                    resolve(chunk);
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }

    public loadOne(id: number): Promise<Hall> {
        return new Promise((resolve, reject) => this.dataService.hallsOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Hall().build(res.data)) : reject(res.error), err => reject(err.message)));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.hallsDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }    

    public create(x: Hall): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.hallsCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public update(x: Hall): Promise<Hall> {
        return new Promise((resolve, reject) => this.dataService.hallsUpdate(x).subscribe(res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), err => reject(err.message)));
    }
}
