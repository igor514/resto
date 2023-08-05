import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { Order } from "src/model/orm/order.entity";
import { Sortdir } from "src/model/sortdir.type";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService extends APIService {
    constructor (@InjectRepository(Order) private orderRepository: Repository<Order>) {
        super();
    }    

    public async chunk(dto: IGetChunk): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const filter = this.buildFilter(dto.filter);
            const query = this.orderRepository.createQueryBuilder("orders").where(filter);
            const data: Order[] = await query.orderBy({[`orders.${sortBy}`]: sortDir}).take(q).skip(from).getMany();
            const allLength: number = await query.getCount();
            const sum = Number((await this.orderRepository.createQueryBuilder("orders").select("SUM(orders.sum)", "sum").where(filter).getRawOne()).sum);              
            return {statusCode: 200, data, allLength, sum};
        } catch (err) {
            const errTxt: string = `Error in OrdersService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    

    private buildFilter(o: any): string {
        let filter: string = "TRUE"; 

        if (o.created_at[0]) {
            const from: string = this.mysqlDate(new Date(o.created_at[0]));
            const to: string = o.created_at[1] ? this.mysqlDate(new Date(o.created_at[1])) : from;
            filter += ` AND orders.created_at BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
        }

        if (o.restaurant_id) {
            filter += ` AND orders.restaurant_id = '${o.restaurant_id}'`;
        }        

        return filter;
    }    
}
