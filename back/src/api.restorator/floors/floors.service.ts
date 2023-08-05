import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IFloorCreate } from "./dto/floor.create.interface";
import { IFloorUpdate } from "./dto/floor.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import {Floor} from "../../model/orm/floor.entity";
import {Room} from "../../model/orm/room.entity";

@Injectable()
export class FloorsService extends APIService {
    constructor (
        @InjectRepository(Floor) private floorRepository: Repository<Floor>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
    ) {
        super();
    }  
    
    public async all(dto: IGetAll): Promise<IAnswer<Floor[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";            
            const data: Floor[] = await this.floorRepository
                .createQueryBuilder("floors")
                .leftJoinAndSelect("floors.rooms", "rooms")
                .where(this.filterToQbfilter(dto.filter, "floors"), dto.filter)
                .orderBy({
                    [`floors.${sortBy}`]: sortDir,
                    "rooms.no": "ASC",
                })
                .getMany();
            return {statusCode: 200, data};
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
            let data: Floor[] = await this.floorRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
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
            let data: Floor = await this.floorRepository.findOne({where: {id}});
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "floor not found"};
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

    public async create(dto: IFloorCreate): Promise<IAnswer<void>> {
        try {            
            let x: Floor = this.floorRepository.create(dto);
            await this.floorRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FloorsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
    
    public async update(dto: IFloorUpdate): Promise<IAnswer<Floor>> {
        try {
            let x: Floor = this.floorRepository.create(dto);
            await this.floorRepository.save(x);
            await this.deleteUnbindedRooms();
            let data: Floor = await this.floorRepository.findOne({where: {id: dto.id}, relations: ["rooms"]});
            return {statusCode: 200, data};
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
