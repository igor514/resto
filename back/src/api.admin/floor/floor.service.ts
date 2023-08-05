import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, IsNull, Repository} from "typeorm";

import {APIService} from "../../common/api.service";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";
import {Floor} from "../../model/orm/floor.entity";
import {Room} from "../../model/orm/room.entity";
import {IFloorUpdate} from "./dto/floor.update.interface";
import {IFloorCreate} from "./dto/floor.create.interface";

@Injectable()
export class FloorService extends APIService {
    constructor(
        @InjectRepository(Floor) private floorRepository: Repository<Floor>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
    ) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Floor[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const floors: Floor[] = await this.floorRepository.find({where: filter, order: {[sortBy]: sortDir}});

            for (let f of floors) {
                f.rooms = await this.roomRepository.find({where: {floor_id: f.id}, order: {no: "ASC"}});
            }

            return {statusCode: 200, data: floors};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Floor[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Floor[] = await this.floorRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["restaurant"]
            });
            let allLength: number = await this.floorRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Floor>> {
        try {
            let data: Floor = await this.floorRepository
                .createQueryBuilder("floors")
                .leftJoinAndSelect("floors.rooms", "rooms")
                .where({id})
                .orderBy({"rooms.no": "ASC"})
                .getOne();
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.floorRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.floorRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IFloorCreate): Promise<IAnswer<void>> {
        try {
            if (dto.number === null) {
                return {statusCode: 400, error: "required field is empty"};
            }
            for (let room of dto.rooms) {
                if (room.no === null) return {
                    statusCode: 400, error: "room required field is empty"
                }
            }

            let x: Floor = this.floorRepository.create(dto);
            await this.floorRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IFloorUpdate): Promise<IAnswer<void>> {
        try {
            if (dto.number === null) {
                return {statusCode: 400, error: "required field is empty"};
            }
            for (let room of dto.rooms) {
                if (room.no === null) return {
                    statusCode: 400, error: "room required field is empty"
                }
            }

            let x: Floor = this.floorRepository.create(dto);
            await this.floorRepository.save(x);
            await this.deleteUnbindedRooms();
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private deleteUnbindedRooms(): Promise<DeleteResult> {
        return this.roomRepository.delete({floor_id: IsNull()});
    }
}
