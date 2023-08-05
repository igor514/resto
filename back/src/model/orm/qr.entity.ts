import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Restaurant} from "./restaurant.entity";
import {CornerDotType, CornerSquareType, DotType} from "@loskir/styled-qr-code-node";
import {Icon} from "./icon.entity";

@Entity("vne_qr_config")
export class QRConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: 200})
    size: number; // width and height
    @Column({nullable: false, default: 10})
    margin: number; // margin from border

    // dots
    @Column({nullable: false})
    dotColor: string
    @Column({nullable: false})
    dotType: DotType;

    // corner dots
    @Column({nullable: false})
    cornerDotColor: string
    @Column({nullable: false})
    cornerDotType: CornerDotType;

    // squares
    @Column({nullable: false})
    cornerSquareColor: string
    @Column({nullable: false})
    cornerSquareType: CornerSquareType;

    // image
    @Column({nullable: false, default: 2})
    imageMargin: number
    @Column('decimal', {nullable: false, default: 0.3})
    imageSize: number

    @Column({nullable: false})
    background: string


    @Column({nullable: false})
    restaurant_id: number;

    @CreateDateColumn()
    createdAt: Date;

    // icon uploaded by user
    @Column({nullable: true})
    img: string;
    // pre uploaded icon by admin
    @Column({nullable: true})
    icon_id: number

    @OneToOne(type => Restaurant, (rest) => rest.qr, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

    @ManyToOne(type => Icon, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "icon_id"})
    icon: Icon;
}