import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {APIService} from "../../common/api.service";
import {Serving} from "../../model/orm/serving.entity";
import {IServingCreate} from "./dto/serving.create.interface";
import {IServingUpdate} from "./dto/serving.update.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";

@Injectable()
export class ServingsService extends APIService {
    constructor(@InjectRepository(Serving) private servingRepository: Repository<Serving>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Serving[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Serving[] = await this.servingRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                relations: ["translations"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Serving[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Serving[] = await this.servingRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["translations"]
            });
            let allLength: number = await this.servingRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Serving>> {
        try {
            let data: Serving = await this.servingRepository.findOne({where: {id}, relations: ["translations"]});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IServingCreate): Promise<IAnswer<void>> {
        try {
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }

            let x: Serving = this.servingRepository.create(dto);
            await this.servingRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IServingUpdate): Promise<IAnswer<void>> {
        try {
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }

            let x: Serving = this.servingRepository.create(dto);
            await this.servingRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.servingRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.servingRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ServingsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
