import {RoomTypeTranslation} from "../../../model/orm/room.type.translation.entity";

export interface IRoomTypeUpdate {
    readonly id: number;
    readonly name: string;
    readonly priority: number;
    readonly translations: RoomTypeTranslation[];
}