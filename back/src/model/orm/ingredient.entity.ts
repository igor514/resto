import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import {IngredientType} from "./ingredient.type.entity";
import { Unit } from "./unit.entity";

@Entity({name: "vne_ingredients"})
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    product_id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: 0})
    amount: number;

    @Column({nullable: false, default: false})
    excludable: boolean;

    @Column({nullable: true})
    type_id: number

    @Column({nullable: true})
    unit_id: number

    // relations
    @ManyToOne(type => Product, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "product_id"})
    product: Product;

    @ManyToOne(type => Unit, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "unit_id"})
    unit: Unit;

    @ManyToOne(type => IngredientType, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "type_id"})
    type: IngredientType;
}