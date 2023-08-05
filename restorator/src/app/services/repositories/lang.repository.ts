import { Injectable } from '@angular/core';
import { Lang } from '../../model/orm/lang.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class LangRepository {    
    public langs: Lang[] = [];
    
    constructor(protected dataService: DataService) {}
    
    public loadAll(sortBy: string = "pos", sortDir: number = 1): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy, sortDir};
            this.dataService.langsAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {
                    this.langs = res.data.length ? res.data.map(d => new Lang().build(d)) : [];                          
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
