import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "vne_langs"})
export class Lang {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable: true, default: null})
    slug: string;

    @Column({nullable: true, default: null})
    title: string;

    @Column({nullable: true, default: null})
    shorttitle: string;

    @Column({nullable: true, default: null})
    img: string;    

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: true})
    active: boolean;

    @Column({nullable: false, default: false})
    slugable: boolean;

    @Column({nullable: false, default: "ltr"})
    dir: string;

    @Column({nullable: false, default: false})
    defended: boolean;
}
