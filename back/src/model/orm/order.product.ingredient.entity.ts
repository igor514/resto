import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./order.product.entity";

@Entity({name: "vne_order_product_ingredients"})
export class OrderProductIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    order_product_id: number;

    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: false, default: true})
    included: boolean;

    @ManyToOne(type => OrderProduct, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "order_product_id"})
    product: OrderProduct;
}