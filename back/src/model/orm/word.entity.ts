import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WordTranslation } from "./word.translation.entity";
import { Wordbook } from "./wordbook.entity";

@Entity({name: "vne_words"}) 
export class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    wordbook_id: number;

    @Column({nullable: false, default: 0})
    pos: number;

    @Index()
    @Column({nullable: true, default: null})
    mark: string;

    @Column({nullable: true, default: null})
    note: string;

    // relations
    @ManyToOne(type => Wordbook, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "wordbook_id"})
    wordbook: Wordbook;

    @OneToMany(type => WordTranslation, translation => translation.word, {cascade: true})
    translations: WordTranslation[];
}