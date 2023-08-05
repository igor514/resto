import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { Table } from "./table.entity";

@Entity({name: "vne_halls"})
export class Hall {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 5})
    nx: number;

    @Column({nullable: false, default: 5})
    ny: number;

    @Column({nullable: false, default: 0})
    pos: number;

    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @OneToMany(type => Table, table => table.hall, {cascade: true})
    tables: Table[];
}