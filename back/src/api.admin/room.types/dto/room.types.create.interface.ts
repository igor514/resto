import {RoomTypeTranslation} from "../../../model/orm/room.type.translation.entity";

export interface IRoomTypeCreate {
    readonly nane: string;
    readonly priority: number;
    readonly translations: RoomTypeTranslation[];
}