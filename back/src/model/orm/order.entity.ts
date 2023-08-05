import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";
import { Hall } from "./hall.entity";
import { OrderProduct } from "./order.product.entity";
import { Restaurant } from "./restaurant.entity";
import { Table } from "./table.entity";
import {Room} from "./room.entity";
import {Floor} from "./floor.entity";
import {OrderGroup} from "./order.group.entity";

export enum OrderStatus {
    Active = "active",
    Paid = 'paid',
    Completed = "completed",
    Cancelled = "cancelled",    
}

export enum Paymethod {
    Cash = "cash",
    Card = "card",
}

@Entity({name: "vne_orders"})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    table_id: number;

    @Column({nullable: true, default: null})
    hall_id: number;

    @Column({nullable: true, default: null})
    room_id: number;

    @Column({nullable: true, default: null})
    floor_id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: true, default: null})
    employee_id: number;

    @Column({nullable: true, default: null})
    group_id: number;

    @Column({nullable: false, default: "", type: "text"})
    customer_comment: string;

    @Column({nullable: false, default: "", type: "text"})
    employee_comment: string;

    @Column({nullable: false, default: false})
    need_waiter: boolean;

    @Column({nullable: false, default: false})
    need_invoice: boolean;

    @Column({nullable: false, default: false})
    need_products: boolean;    

    @Column({nullable: false, default: 0})
    discount_percent: number;

    // специально формируем сумму как отдельное поле, чтобы когда она понадобится в статистике - не формировать это значение как сумму товаров
    @Index()
    @Column({nullable: true, default: null, type: "float"}) 
    sum: number;

    @Index()
    @Column({type: "enum", enum: OrderStatus, nullable: false, default: OrderStatus.Active})
    status: OrderStatus;

    @Index()
    @Column({type: "enum", enum: Paymethod, nullable: false, default: Paymethod.Cash})
    paymethod: Paymethod;
    
    @Index()
    @CreateDateColumn()
    created_at: Date;
    
    @Index()
    @Column({nullable: true, default: null})
    accepted_at: Date;

    @Index()
    @Column({nullable: true, default: null})
    completed_at: Date;

    // relations
    @ManyToOne(type => Table, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "table_id"})
    table: Table;

    @ManyToOne(type => Hall, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "hall_id"})
    hall: Hall;

    @ManyToOne(type => Room, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "room_id", referencedColumnName: "id"})
    room: Room;

    @ManyToOne(type => Floor, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "floor_id", referencedColumnName: "id"})
    floor: Floor;

    @ManyToOne(type => OrderGroup, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "group_id", referencedColumnName: "id"})
    group: OrderGroup;
    
    @ManyToOne(type => Restaurant, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @ManyToOne(type => Employee, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "employee_id"})
    employee: Employee;

    @OneToMany(type => OrderProduct, product => product.order, {cascade: true})
    products: OrderProduct[];
}