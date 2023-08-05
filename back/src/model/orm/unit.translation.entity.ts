import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Lang} from "./lang.entity";
import {Unit} from "./unit.entity";

@Entity({name: "vne_units_translations"})
export class UnitTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    unit_id: number;

    @Column({nullable: false})
    lang_id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    short: string;

    @ManyToOne(() => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;

    @ManyToOne(() => Unit, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "unit_id"})
    unit: Unit;
}