import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {PaymentMethod} from "../../utils/constants";

@Entity({name: "vne_payment_config"})
export class PaymentConfig {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false, unique: true, enum: PaymentMethod})
    type: PaymentMethod;

    @Column({nullable: true, default: null, type: "real"})
    vat: number;
    @Column({nullable: true, default: null, type: "real"})
    tax: number;
    @Column({nullable: true, default: null, type: "real"})
    gateway_fee: number;

    @Column({nullable: false, default: true})
    vat_enabled: boolean;
    @Column({nullable: false, default: true})
    tax_enabled: boolean;
    @Column({nullable: false, default: true})
    gateway_fee_enabled: boolean;
}