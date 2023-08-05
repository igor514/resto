import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeStatusTranslation } from "./employee.status.translation.entity";

@Entity({name: "vne_employee_statuses"})
export class EmployeeStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: "#000000"})
    color: string;

    @Column({nullable: false, default: 0})
    pos: number;    

    // relations    
    @OneToMany(type => EmployeeStatusTranslation, translation => translation.employeeStatus, {cascade: true})
    translations: EmployeeStatusTranslation[];
}