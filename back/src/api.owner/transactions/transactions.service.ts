import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {APIService} from "../../common/api.service";
import {Transaction} from "../../model/orm/transaction.entity";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {Sortdir} from "src/model/sortdir.type";
import {db_name, db_schema} from "src/config/options";
import {dataSource} from "../../main";


@Injectable()
export class TransactionsService extends APIService {
    constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) {
        super();
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Transaction[]>> {
        try {
            let sortBy: string = dto.sortBy;
            let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let from: number = dto.from;
            let q: number = dto.q;
            let filter: string = "TRUE";

            if (dto.filter.created_at[0]) {
                let from: string = this.mysqlDate(new Date(dto.filter.created_at[0]));
                let to: string = dto.filter.created_at[1] ? this.mysqlDate(new Date(dto.filter.created_at[1])) : from;
                filter += ` AND created_at BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
            }

            if (dto.filter.restaurant_id) {
                filter += ` AND restaurant_id = '${dto.filter.restaurant_id}'`;
            }

            if (dto.filter.type) {
                filter += ` AND type = '${dto.filter.type}'`;
            }

            let query = this.transactionRepository.createQueryBuilder("transactions").where(filter);
            let data: Transaction[] = await query.orderBy({[`${sortBy}`]: sortDir}).take(q).skip(from).getMany();
            let allLength: number = await query.getCount();
            let sumRes = await dataSource.manager.query(`SELECT SUM(amount) AS sum
                                                         FROM ${db_name}.${db_schema}.vne_transactions
                                                         WHERE ${filter}`);
            let sum: number = sumRes[0].sum ? parseFloat(sumRes[0].sum) : 0;

            return {statusCode: 200, data, allLength, sum};
        } catch (err) {
            let errTxt: string = `Error in TransactionsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
