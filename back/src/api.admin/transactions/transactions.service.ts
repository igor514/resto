import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { APIService } from "../../common/api.service";
import { Transaction } from "../../model/orm/transaction.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { Sortdir } from "src/model/sortdir.type";


@Injectable()
export class TransactionsService extends APIService {
    constructor (@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) {
        super();
    }        

    public async chunk(dto: IGetChunk): Promise<IAnswer<Transaction[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Transaction[] = await this.transactionRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from, relations: ["restaurant"]});
            let allLength: number = await this.transactionRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in TransactionsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
