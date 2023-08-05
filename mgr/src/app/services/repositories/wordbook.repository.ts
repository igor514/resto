import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Wordbook } from '../../model/orm/wordbook.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { Word } from 'src/app/model/orm/word.model';

@Injectable()
export class WordbookRepository extends Repository<Wordbook> {
    public schema: string = "wordbook";    
    public chunkSortBy: string = "pos";    

    constructor(
        protected dataService: DataService,        
    ) {
        super(dataService);
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,                    
            };
            this.dataService.wordbooksChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlChunk = res.data.length ? res.data.map(d => new Wordbook().build(d)) : [];
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

    public loadOne(id: number): Promise<Wordbook> {
        return new Promise((resolve, reject) => {
            this.dataService.wordbooksOne(id).subscribe(res => {
                if (res.statusCode === 200) {                    
                    if (res.data) {
                        let x: Wordbook = new Wordbook().build(res.data); 
                        x.words = res.data.words.map(w => new Word().build(w));
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
            this.dataService.wordbooksDelete(id).subscribe(res => {
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
            this.dataService.wordbooksDeleteBulk(ids).subscribe(res => {
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

    public create(x: Wordbook): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.wordbooksCreate(x).subscribe(res => {
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

    public update(x: Wordbook): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.wordbooksUpdate(x).subscribe(res => {
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
