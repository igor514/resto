import {CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order.entity";

@Entity({name: "vne_order_group"})
export class OrderGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Order, (order) => order.group)
    orders: Order[]
}