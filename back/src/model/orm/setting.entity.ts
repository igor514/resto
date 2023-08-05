import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "vne_settings"})
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({nullable: true, default: null})
    p: string;

    @Column({nullable: true, default: null})
    v: string;

    @Column({nullable: true, default: null})
    c: string;

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: false})
    in_app: boolean;

    @Column({nullable: false, default: false})
    defended: boolean;
}
