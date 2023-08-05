import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeStatus } from "./employee.status.entity";
import { Lang } from "./lang.entity";

@Entity({name: "vne_employee_status_translations"})
export class EmployeeStatusTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    employee_status_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    name: string;

    // relations
    @ManyToOne(type => EmployeeStatus, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "employee_status_id"})
    employeeStatus: EmployeeStatus;

    @ManyToOne(type => Lang, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;
}