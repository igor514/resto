import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {IAnswer} from "src/model/dto/answer.interface";
import {Table} from "src/model/orm/table.entity";
import {Repository} from "typeorm";
import {ITable} from "./dto/table.interface";

@Injectable()
export class TablesService {
    constructor(@InjectRepository(Table) private tableRepository: Repository<Table>) {
    }

    public async oneByCode(code: string): Promise<IAnswer<ITable>> {
        try {
            const table = await this.tableRepository.findOne({
                where: {code},
                relations: ["hall", "hall.restaurant", "hall.restaurant.currency", "hall.restaurant.lang"]
            });

            if (!table || !table.hall || !table.hall.restaurant || !table.hall.restaurant.currency) {
                return {statusCode: 404, error: "table or related not found"};
            }

            const data = this.buildTable(table);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TablesService.oneByCode: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async oneById(id: number): Promise<IAnswer<ITable>> {
        try {
            const table = await this.tableRepository.findOne({
                where: {id},
                relations: ["hall", "hall.restaurant", "hall.restaurant.currency", "hall.restaurant.lang"]
            });

            if (!table || !table.hall || !table.hall.restaurant || !table.hall.restaurant.currency) {
                return {statusCode: 404, error: "table or related not found"};
            }

            const data = this.buildTable(table);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TablesService.oneByCode: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private buildTable(table: Table): ITable {
        return {
            id: table.id,
            no: table.no,
            seats: table.seats,
            code: table.code,
            hall_id: table.hall.id,
            restaurant_id: table.hall.restaurant.id,
            lang_id: table.hall.restaurant.lang_id,
            lang_slug: table.hall.restaurant.lang.slug,
            currency_symbol: table.hall.restaurant.currency.symbol,
        };
    }
}