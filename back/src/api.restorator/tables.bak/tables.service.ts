import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/dto/answer.interface";
import { Hall } from "src/model/orm/hall.entity";
import { Table } from "src/model/orm/table.entity";
import { Repository } from "typeorm";

@Injectable()
export class TablesService extends APIService {
    constructor(@InjectRepository(Hall) private hallRepository: Repository<Hall>) {
        super();
    }

    public async allByRestaurant(restaurant_id: number): Promise<IAnswer<Table[]>> {
        try {
            const halls = await this.hallRepository.find({where: {restaurant_id}, relations: ["tables"]});
            let tables: Table[] = [];

            for (let h of halls) {
                tables = [...tables, ...h.tables];
            }

            tables.sort((a, b) => a.no - b.no);
            return {statusCode: 200, data: tables};
        } catch (err) {
            const errTxt: string = `Error in TablesService.allByRestaurant: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}