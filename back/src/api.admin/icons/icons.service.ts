import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {APIService} from "../../common/api.service";
import {Icon} from "../../model/orm/icon.entity";
import {IIconCreate} from "./dto/icon.create.interface";
import {IIconUpdate} from "./dto/icon.update.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";

@Injectable()
export class IconsService extends APIService {
    constructor(@InjectRepository(Icon) private iconRepository: Repository<Icon>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Icon[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Icon[] = await this.iconRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                relations: ["translations"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in IconsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Icon[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Icon[] = await this.iconRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["translations"]
            });
            let allLength: number = await this.iconRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in IconsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Icon>> {
        try {
            let data: Icon = await this.iconRepository.findOne({where: {id}, relations: ["translations"]});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in IconsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IIconCreate): Promise<IAnswer<void>> {
        try {
            if (!dto.img) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: Icon = this.iconRepository.create(dto);
            await this.iconRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IconsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IIconUpdate): Promise<IAnswer<void>> {
        try {
            if (!dto.img) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: Icon = this.iconRepository.create(dto);
            await this.iconRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IconsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.iconRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IconsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.iconRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IconsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
