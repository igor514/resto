import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeStatus } from "./employee.status.entity";
import { Restaurant } from "./restaurant.entity";

@Entity({name: "vne_employees"})
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    restaurant_id: number;

    @Column({nullable: true, default: null})
    employee_status_id: number;

    @Index()
    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: true, default: null, select: false})
    password: string;

    @Index()
    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: true, default: null})
    phone: string;

    @Column({nullable: false, default: false})
    is_admin: boolean;

    @CreateDateColumn()
    created_at: Date;   

    @Column({nullable: false, default: false})
    defended: boolean;
    
    // relations
    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @ManyToOne(type => EmployeeStatus, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "employee_status_id"})
    status: EmployeeStatus;
}