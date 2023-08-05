import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IAnswer} from 'src/model/dto/answer.interface';
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";
import {APIService} from "./api.service";
import {WSServer} from "../model/orm/wsserver.entity";

@Injectable()
export class WSServersService extends APIService {
    constructor(@InjectRepository(WSServer) protected wsserverRepository: Repository<WSServer>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<WSServer[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const data: WSServer[] = await this.wsserverRepository.find({where: filter, order: {[sortBy]: sortDir}});
            return {statusCode: 200, data};
        } catch (err) {
            const errTxt: string = `Error in WSServersService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
