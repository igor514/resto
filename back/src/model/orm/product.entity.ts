import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./cat.entity";
import { Ingredient } from "./ingredient.entity";
import { ProductImage } from "./product.image.entity";
import { Restaurant } from "./restaurant.entity";

export enum ProductUnit {
    g = "g",
    ml = "ml",
}

@Entity({name: "vne_products"})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: true, default: null})
    cat_id: number;

    @Index()
    @Column({nullable: true, default: null})
    code: string;

    @Index()
    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: 0, type: "float"})
    price: number;

    @Column({nullable: false, default: 0}) // используется как вес или объем
    weight: number;
    
    @Column({type: "enum", enum: ProductUnit, nullable: false, default: ProductUnit.g})
    unit: ProductUnit;    

    @Column({nullable: false, default: 0})
    cal: number;

    @Column({nullable: true, default: null})
    time: string;    

    @Column({nullable: true, default: null, type: "text"})
    about: string;    

    @Column({nullable: false, default: 0})
    pos: number;

    @Column({nullable: false, default: true})
    active: boolean;

    @Column({nullable: false, default: false})
    recommended: boolean;

    @Column({nullable: false, default: 0})
    likes: number;

    @Column({nullable: false, default: false})
    alc: boolean;

    @Column({nullable: false, default: 0})
    alc_percent: number;

    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @ManyToOne(type => Cat, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "cat_id"})
    cat: Cat;
    
    @OneToMany(type => ProductImage, image => image.product, {cascade: true})
    images: ProductImage[];

    @OneToMany(type => Ingredient, ingredient => ingredient.product, {cascade: true})
    ingredients: Ingredient[];
}
