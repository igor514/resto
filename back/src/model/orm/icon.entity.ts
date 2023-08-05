import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IconTranslation } from "./icon.translation.entity";

export enum IconType {
    Category = 'category',
    QR = 'qr',
}

@Entity({name: "vne_icons"})
export class Icon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    img: string;

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: IconType.Category})
    type: IconType

    // relations    
    @OneToMany(type => IconTranslation, translation => translation.icon, {cascade: true})
    translations: IconTranslation[];
}