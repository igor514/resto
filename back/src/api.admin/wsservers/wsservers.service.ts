import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WSServer} from "../../model/orm/wsserver.entity";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IWSServerCreate} from "./dto/wsserver.create.interface";
import {IWSServerUpdate} from "./dto/wsserver.update.interface";
import {Sortdir} from "src/model/sortdir.type";
import {WSServersService as WSCommonService} from "../../common/ws-server.service";

@Injectable()
export class WSService extends WSCommonService {
    constructor(
        @InjectRepository(WSServer) protected wsserverRepository: Repository<WSServer>
    ) {
        super(wsserverRepository);
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<WSServer[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const filter: Object = dto.filter;
            const data: WSServer[] = await this.wsserverRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from
            });
            const allLength: number = await this.wsserverRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            const errTxt: string = `Error in WSServersService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<WSServer>> {
        try {
            const data: WSServer = await this.wsserverRepository.findOne({where: {id}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in WSServersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.wsserverRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WSServersService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.wsserverRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WSServersService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IWSServerCreate): Promise<IAnswer<void>> {
        try {
            if (!dto.url) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: WSServer = this.wsserverRepository.create(dto);
            await this.wsserverRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WSServersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IWSServerUpdate): Promise<IAnswer<void>> {
        try {
            if (!dto.url) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: WSServer = this.wsserverRepository.create(dto);
            await this.wsserverRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in WSServersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
