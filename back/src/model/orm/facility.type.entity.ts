import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Restaurant} from "./restaurant.entity";
import {FacilityTypeTranslation} from "./facility.type.translation.entity";

@Entity({name: "vne_facility_type"})
export class FacilityType {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({nullable: false, default: false})
    is_hotel: boolean;

    // relations
    @OneToMany(() => Restaurant, rest => rest.type, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurants: Restaurant[];

    @OneToMany(() => FacilityTypeTranslation, translation => translation.type, {cascade: true})
    translations: FacilityTypeTranslation[];
}