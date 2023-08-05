import { Injectable } from '@angular/core';

import { Words } from 'src/app/model/orm/words.type';
import { DataService } from '../data.service';

@Injectable()
export class WordRepository {
    public words: Words;
    
    constructor(protected dataService: DataService) {}
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            this.dataService.wordsAll().subscribe(res => {                    
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
