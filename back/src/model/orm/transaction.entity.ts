import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import {Order} from "./order.entity";

export enum BalanceType {
    Auto = "auto",
    Employee = "employee",
    Admin = "admin",    
}

export enum PaymentType {
    Balance = "balance",
    Order = "order",
}

export enum PaymentStatus {
    Pending = "pending",
    Success = 'success',
    Rejected = 'rejected',
}

@Entity({name: "vne_transactions"})
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false, default: 0, type: "real"})
    amount: number; // original charge amount
    @Column({nullable: false, default: 0, type: "real"})
    total: number; // amount with taxes included
    @CreateDateColumn()
    created_at: Date;


    // order related fields
    @Column({nullable: true, default: null})
    order_id: number;
    @Column({nullable: true, default: null})
    account_id: number; // stripe connected account id


    // balance related fields
    @Column({type: "enum", enum: BalanceType, nullable: false, default: BalanceType.Auto})
    balance_type: BalanceType;
    @Column({nullable: true, default: null})
    restaurant_id: number;


    // stripe fields
    @Column({nullable: true, default: null})
    payment_id: string;
    @Column({nullable: true, default: null})
    payment_link_id: string;

    // general fields
    @Column({type: "enum", enum: PaymentType, nullable: true, default: null})
    payment_type: PaymentType;
    @Column({type: "enum", enum: PaymentStatus, nullable: true, default: null})
    payment_status: PaymentStatus;


    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;
    @ManyToOne(type => Order, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "order_id"})
    order: Order;
}