import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lang } from "./lang.entity";
import { Word } from "./word.entity";

@Entity({name: "vne_word_translations"})
export class WordTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    word_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({type: "text", nullable: true, default: null})
    text: string;

    // relations
    @ManyToOne(type => Word, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "word_id"})
    word: Word;

    @ManyToOne(type => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}