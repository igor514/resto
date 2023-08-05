import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IAnswer } from "src/model/dto/answer.interface";
import { Repository } from "typeorm";
import { IRoom } from "./dto/room.interface";
import {Room} from "../../model/orm/room.entity";

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

    public async oneByCode(code: string): Promise<IAnswer<IRoom>> {
        try {
            const room = await this.roomRepository.findOne({where: {code}, relations: ["floor", "floor.restaurant", "floor.restaurant.currency", "floor.restaurant.lang"]});

            if (!room || !room.floor || !room.floor.restaurant || !room.floor.restaurant.currency) {
                return {statusCode: 404, error: "room or related not found"};
            }

            const data = this.buildRoom(room);
            return {statusCode: 200, data};
        } catch (err) {
            const errTxt = `Error in RoomsService.oneByCode: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async oneById(id: number): Promise<IAnswer<IRoom>> {
        try {
            const room = await this.roomRepository.findOne({where: {id}, relations: ["floor", "floor.restaurant", "floor.restaurant.currency", "floor.restaurant.lang"]});

            if (!room || !room.floor || !room.floor.restaurant || !room.floor.restaurant.currency) {
                return {statusCode: 404, error: "room or related not found"};
            }

            const data = this.buildRoom(room);
            return {statusCode: 200, data};
        } catch (err) {
            const errTxt = `Error in RoomsService.oneByCode: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    private buildRoom(room: Room): IRoom {
        return {
            id: room.id,
            no: room.no,
            capacity: room.capacity,
            code: room.code,
            floor_id: room.floor.id,
            restaurant_id: room.floor.restaurant.id,
            lang_id: room.floor.restaurant.lang_id,
            lang_slug: room.floor.restaurant.lang.slug,
            currency_symbol: room.floor.restaurant.currency.symbol,
        };
    }
}