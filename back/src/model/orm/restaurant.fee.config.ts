import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {PaymentMethod} from "../../utils/constants";
import {Restaurant} from "./restaurant.entity";

@Entity({name: "vne_restaurant_fee_configs"})
export class RestaurantFeeConfig {
    @PrimaryColumn()
    restaurant_id: number;
    @PrimaryColumn({enum: PaymentMethod})
    payment_type: PaymentMethod;

    // stripe
    @Column({nullable: true, default: null})
    secret_key: string
    @Column({nullable: true, default: null})
    public_key: string

    //payments - balance
    @Column({nullable: true, default: null, type: "real"})
    vat_balance: number;
    @Column({nullable: true, default: null, type: "real"})
    tax_balance: number;
    @Column({nullable: true, default: null, type: "real"})
    gateway_fee_balance: number;

    // balance - flags
    @Column({nullable: false, default: false})
    vat_balance_disabled: boolean;
    @Column({nullable: false, default: false})
    tax_balance_disabled: boolean;
    @Column({nullable: false, default: false})
    gateway_fee_balance_disabled: boolean;

    // orders
    @Column({nullable: true, default: 0, type: "real"})
    vat_order: number;
    @Column({nullable: true, default: 0, type: "real"})
    tax_order: number;
    @Column({nullable: true, default: 0, type: "real"})
    service_fee_order: number;
    @Column({nullable: true, default: 0, type: "real"})
    gateway_fee_order: number;

    // orders - flags
    @Column({nullable: false, default: false})
    vat_order_disabled: boolean;
    @Column({nullable: false, default: false})
    tax_order_disabled: boolean;
    @Column({nullable: false, default: false})
    service_fee_order_disabled: boolean;
    @Column({nullable: false, default: false})
    gateway_fee_order_disabled: boolean;

    @ManyToOne(type => Restaurant, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "restaurant_id"})
    restaurant: Restaurant;

}