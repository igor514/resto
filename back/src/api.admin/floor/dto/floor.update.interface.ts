import { Room } from "src/model/orm/room.entity";

export interface IFloorUpdate {
    readonly id: number;
    readonly restaurant_id: number;
    readonly number: number;
    readonly nx: number;
    readonly ny: number;
    readonly rooms: Room[];
}