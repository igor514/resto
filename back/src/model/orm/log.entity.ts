import {Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Admin} from "./admin.entity";
import {Employee} from "./employee.entity";

@Entity({name: 'vne_auth_logs'})
export class Log {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    ip: string;

    @Column()
    device: string;

    @Column()
    browser: string;

    @Column({nullable: true})
    admin_id: number;

    @Column({nullable: true})
    employee_id: number;

    // relations
    @ManyToOne(type => Admin, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "admin_id"})
    admin: Admin;

    @ManyToOne(type => Employee, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "employee_id"})
    employee: Employee;
}