import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, Generated, PrimaryColumn} from "typeorm";
import {Restaurant} from "./restaurant.entity";
import {Room} from './room.entity';

@Entity({name: "vne_floor"})
export class Floor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: false, default: 5})
    nx: number;

    @Column({nullable: false, default: 5})
    ny: number;

    @Column({nullable: false})
    number: number;

    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @OneToMany(type => Room, room => room.floor, {cascade: true})
    rooms: Room[];
}