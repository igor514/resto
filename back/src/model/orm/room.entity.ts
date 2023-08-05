import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Floor} from './floor.entity'
import {RoomType} from "./room.type.entity";
import {Order} from "./order.entity";

@Entity({name: "vne_room"})
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    floor_id: number;

    @Column({nullable: false})
    no: string;

    @Column({nullable: false, default: 0})
    capacity: number;

    @Column({nullable: false, default: 0})
    x: number;

    @Column({nullable: false, default: 0})
    y: number;

    @Column({nullable: true, default: null, unique: true})
    code: string;

    @Column({nullable: true, default: null})
    type_id: number;

    // relations
    @ManyToOne(type => Floor, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "floor_id"})
    floor: Floor;

    @ManyToOne(type => RoomType, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'type_id'})
    type: RoomType;

    @OneToMany(type => Order, order => order.room, {cascade: true})
    orders: Order[];
}