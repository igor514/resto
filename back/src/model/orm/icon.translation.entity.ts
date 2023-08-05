import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Icon } from "./icon.entity";
import { Lang } from "./lang.entity";

@Entity({name: "vne_icon_translations"})
export class IconTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    icon_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    name: string;

    // relations
    @ManyToOne(type => Icon, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "icon_id"})
    icon: Icon;

    @ManyToOne(type => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}