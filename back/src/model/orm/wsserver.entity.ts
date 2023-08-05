import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "vne_wsservers"})
export class WSServer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    url: string;

    @Column({nullable: false, default: 0})
    pos: number;
}