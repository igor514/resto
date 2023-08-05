import { Injectable } from "@angular/core";
import { IChunk } from "src/app/model/chunk.interface";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { Transaction } from "src/app/model/orm/transaction.model";
import { DataService } from "../data.service";
import { Repository2 } from "./_repository2";

@Injectable()
export class TransactionRepository extends Repository2 {
    constructor(protected dataService: DataService) {
        super(dataService);        
    }    

    public loadChunk(part: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<IChunk<Transaction>> {
        return new Promise((resolve, reject) => {                        
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.transactionsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const chunk: IChunk<Transaction> = {data: res.data.map(d => new Transaction().build(d)), allLength: res.allLength, sum: res.sum};
                    resolve(chunk);
                } else {                        
                    reject(res.error);
                }                    
            }, err => {
                reject(err.message);                
            });            
        });
    }    
}