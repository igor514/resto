import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admingroup } from "./admingroup.entity";


@Entity({name: "vne_admins"})
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    admingroup_id: number;

    @Column({nullable: true, default: null})
    name: string;
    
    @Index()
    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: true, default: null, select: false})
    password: string;

    @Column({nullable: true, default: null})
    img: string;
    
    @Column({nullable: false, default: true})
    active: boolean;

    @Column({nullable: false, default: false})
    defended: boolean;

    // relations
    @ManyToOne(type => Admingroup, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
    @JoinColumn({name: "admingroup_id"})
    admingroup: Admingroup;
}
