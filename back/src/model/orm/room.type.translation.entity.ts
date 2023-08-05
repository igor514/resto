import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lang } from "./lang.entity";
import {RoomType} from "./room.type.entity";

@Entity({name: "vne_room_type_translation"})
export class RoomTypeTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    type_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    name: string;

    // relations
    @ManyToOne(() => RoomType, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "type_id"})
    type: RoomType;

    @ManyToOne(() => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}