import {Room} from "../../../model/orm/room.entity";

export interface IFloorCreate {
    readonly restaurant_id: number;
    readonly number: number;
    readonly nx: number;
    readonly ny: number;
    readonly rooms: Room[];
}