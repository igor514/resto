import { Injectable } from '@angular/core';
import { Order } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IChunk } from 'src/app/model/chunk.interface';
import { Repository2 } from './_repository2';

@Injectable()
export class OrderRepository extends Repository2 {              
    constructor(protected dataService: DataService) {
        super(dataService);        
    }    

    public loadChunk(part: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<IChunk<Order>> {
        return new Promise((resolve, reject) => {                        
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.ordersChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    const chunk: IChunk<Order> = {data: res.data.map(d => new Order().build(d)), allLength: res.allLength, sum: res.sum};
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
