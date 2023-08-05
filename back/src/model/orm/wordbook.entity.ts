import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Word } from "./word.entity";

@Entity({name: "vne_wordbooks"}) 
export class Wordbook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0})
    pos: number;    

    // relations
    @OneToMany(type => Word, word => word.wordbook, {cascade: true})
    words: Word[];
}