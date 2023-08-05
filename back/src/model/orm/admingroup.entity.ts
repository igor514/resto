import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "vne_admingroups"})
export class Admingroup {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true, default: null})
    name: string;

    @Column({nullable: true, default: null})
    title: string;    

    @Column({nullable: false, default: false})
    defended: boolean;    
}
