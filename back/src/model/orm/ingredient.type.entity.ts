import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ingredient} from "./ingredient.entity";
import {Unit} from "./unit.entity";
import {Restaurant} from "./restaurant.entity";

@Entity({name: "vne_ingredient_types"})
export class IngredientType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0})
    price: number;

    @Column({nullable: false})
    unit_id: number;

    @Column({nullable: false})
    restaurant_id: number;

    @ManyToOne(type => Unit, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "unit_id"})
    unit: Unit;

    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @OneToMany(type => Ingredient, ingredient => ingredient.type, {cascade: true})
    ingredients: Ingredient[];
}