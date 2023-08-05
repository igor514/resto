import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServingTranslation } from "./serving.translation.entity";

@Entity({name: "vne_servings"})
export class Serving {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({nullable: false, default: 0})
    pos: number;    

    @Column({nullable: false, default: false})
    defended: boolean;

    // relations    
    @OneToMany(type => ServingTranslation, translation => translation.serving, {cascade: true})
    translations: ServingTranslation[];
}