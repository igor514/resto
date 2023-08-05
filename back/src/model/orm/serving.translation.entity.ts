import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Serving } from "./serving.entity";
import { Lang } from "./lang.entity";

@Entity({name: "vne_serving_translations"})
export class ServingTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    serving_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    name: string;

    // relations
    @ManyToOne(type => Serving, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "serving_id"})
    serving: Serving;

    @ManyToOne(type => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}