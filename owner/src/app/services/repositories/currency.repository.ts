import { Injectable } from '@angular/core';
import { Currency } from '../../model/orm/currency.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';

@Injectable()
export class CurrencyRepository extends Repository2 {    
    constructor(protected dataService: DataService) {
        super(dataService);        
    }
    
    public loadAll(sortBy: string = "pos", sortDir: number = -1): Promise<Currency[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy, sortDir};
            this.dataService.currenciesAll(dto).subscribe(res => {                    
                if (res.statusCode === 200) {                    
                    resolve(res.data.map(d => new Currency().build(d)));
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
