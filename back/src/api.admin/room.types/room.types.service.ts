import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {APIService} from "../../common/api.service";
import {RoomType} from "../../model/orm/room.type.entity"
import {IRoomTypeCreate} from "./dto/room.types.create.interface";
import {IRoomTypeUpdate} from "./dto/room.types.update.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";

@Injectable()
export class RoomTypesService extends APIService {
    constructor(@InjectRepository(RoomType) private roomTypeRepository: Repository<RoomType>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<RoomType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: RoomType[] = await this.roomTypeRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                relations: ["translations"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<RoomType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: RoomType[] = await this.roomTypeRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["translations"]
            });
            let allLength: number = await this.roomTypeRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<RoomType>> {
        try {
            let data: RoomType = await this.roomTypeRepository.findOne({where: {id}, relations: ["translations"]});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IRoomTypeCreate): Promise<IAnswer<void>> {
        try {
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }

            if (dto.priority === null) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: RoomType = this.roomTypeRepository.create(dto);
            await this.roomTypeRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IRoomTypeUpdate): Promise<IAnswer<void>> {
        try {
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }

            if (dto.priority === null) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: RoomType = this.roomTypeRepository.create(dto);
            await this.roomTypeRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.roomTypeRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.roomTypeRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
