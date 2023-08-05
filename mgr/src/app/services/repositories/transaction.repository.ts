import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Transaction } from '../../model/orm/transaction.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
    public schema: string = "transaction";            
    public chunkSortBy: string = "created_at";    
    public chunkSortDir: number = -1;
    public filterRestaurantId: number = null;    
    
    constructor(protected dataService: DataService) {
        super(dataService);
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {            
            let filter: any = {};
            this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,        
                filter,                        
            };
            this.dataService.transactionsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Transaction().build(d)) : [];
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
}
