import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RoomTypeTranslation} from "./room.type.translation.entity";

@Entity({name: "vne_room_type"})
export class RoomType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: ''})
    name: string;

    @Column({nullable: false, default: 1})
    priority: number;


    @OneToMany(type => RoomTypeTranslation, translation => translation.type, {cascade: true})
    translations: RoomTypeTranslation[];
}