import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: "vne_product_images"})
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    product_id: number;

    @Column({nullable: true, default: null})
    img: string;

    @Column({nullable: false, default: 0})
    pos: number;    

    // relations
    @ManyToOne(type => Product, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "product_id"})
    product: Product;
}