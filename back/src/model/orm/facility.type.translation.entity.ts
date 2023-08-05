import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Lang} from "./lang.entity";
import {FacilityType} from "./facility.type.entity";

@Entity({name: "vne_facility_type_translation"})
export class FacilityTypeTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    type_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    name: string;

    // relations
    @ManyToOne(() => FacilityType, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "type_id"})
    type: FacilityType;

    @ManyToOne(() => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}