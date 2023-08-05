import { Injectable } from '@angular/core';
import { IGetAll } from 'src/app/model/dto/getall.interface';

import { Words } from 'src/app/model/orm/words.type';
import { DataService } from '../data.service';

@Injectable()
export class WordRepository {
    public lang_id: number = null;
    public words: Words = null;
    
    constructor(protected dataService: DataService) {}
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {lang_id: this.lang_id};
            this.dataService.wordsAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {                    
                    this.words = res.data;
                    resolve();
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
