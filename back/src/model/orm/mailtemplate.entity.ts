import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MailtemplateTranslation } from "./mailtemplate.translation.entity";

@Entity({name: "vne_mailtemplates"})
export class Mailtemplate {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable: true, default: null, unique: true})
    name: string;

    @Column({nullable: false, default: false})
    defended: boolean;

    // relations
    @OneToMany(type => MailtemplateTranslation, translation => translation.mailtemplate, {cascade: true})
    translations: MailtemplateTranslation[];
}