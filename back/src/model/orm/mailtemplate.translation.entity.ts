import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lang } from "./lang.entity";
import { Mailtemplate } from "./mailtemplate.entity";

@Entity({name: "vne_mailtemplate_translations"})
export class MailtemplateTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    mailtemplate_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    subject: string;

    @Column({type: "text", nullable: true, default: null})
    content: string;

    // relations
    @ManyToOne(type => Mailtemplate, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "mailtemplate_id"})
    mailtemplate: Mailtemplate;

    @ManyToOne(type => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}