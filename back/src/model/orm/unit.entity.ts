import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UnitTranslation} from "./unit.translation.entity";
import {Ingredient} from "./ingredient.entity";
import {IngredientType} from "./ingredient.type.entity";

@Entity({name: "vne_units"})
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    related_id: number;
    @Column({nullable: true, type: 'decimal'})
    conversion_ratio: number;

    @OneToMany(() => Unit, (u) => u.related, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    units: Unit[]

    @OneToMany(() => UnitTranslation, (t) => t.unit, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    translations: UnitTranslation[]

    @ManyToOne(() => Unit, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: 'related_id'})
    related: Unit

    @OneToMany(type => IngredientType, i => i.unit, {cascade: true})
    types: IngredientType[];
}