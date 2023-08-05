import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "vne_currencies"})
export class Currency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: true, default: null})
    symbol: string;

    @Column({nullable: false, default: 0})
    pos: number;
    
    @Column({nullable: false, default: false})
    defended: boolean;
}