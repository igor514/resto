import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Icon } from "./icon.entity";
import { Restaurant } from "./restaurant.entity";

@Entity({name: "vne_cats"})
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: true, default: null})
    icon_id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: true})
    active: boolean;

    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @ManyToOne(type => Icon, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "icon_id"})
    icon: Icon;
}