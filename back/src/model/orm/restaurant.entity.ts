import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Cat } from "./cat.entity";
import { Currency } from "./currency.entity";
import { Employee } from "./employee.entity";
import { Hall } from "./hall.entity";
import { Lang } from "./lang.entity";
import {FacilityType} from "./facility.type.entity";
import {IngredientType} from "./ingredient.type.entity";
import {RestaurantFeeConfig} from "./restaurant.fee.config";
import {PaymentMethod} from "../../utils/constants";
import {QRConfig} from "./qr.entity";

@Entity({name: "vne_restaurants"})
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    currency_id: number;

    @Column({nullable: true, default: null})
    lang_id: number;

    @Column({nullable: true, default: null})
    type_id: number;

    @Index()
    @Column({nullable: true, default: null})
    name: string;
    
    @Column({nullable: true, default: null})
    domain: string;

    @Column({nullable: true, default: null})
    ownername: string;

    @Column({nullable: true, default: null})
    phone: string;

    @Column({nullable: true, default: null})
    address: string;

    @Column({nullable: true, default: null})
    inn: string;

    @Column({nullable: true, default: null})
    ogrn: string;

    @Column({nullable: true, default: null, type: "text"})
    comment: string;

    @Column({nullable: false, default: 0, type: "float"})
    money: number;

    @Column({nullable: false, default: true})
    active: boolean;

    @Column({nullable: true, default: null, enum: PaymentMethod})
    payment_method: PaymentMethod;

    @CreateDateColumn()
    created_at: Date;    

    // relations
    @ManyToOne(type => Currency, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
    @JoinColumn({name: "currency_id"})
    currency: Currency;

    @ManyToOne(type => FacilityType, {onDelete: "SET NULL", onUpdate: "CASCADE"})
    @JoinColumn({name: "type_id"})
    type: FacilityType;

    @OneToOne(type => QRConfig, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn()
    qr: QRConfig;

    @ManyToOne(type => Lang, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
    @JoinColumn({name: "lang_id"})
    lang: Lang;

    @OneToMany(type => Employee, employee => employee.restaurant, {cascade: true})
    employees: Employee[];

    @OneToMany(type => IngredientType, i => i.restaurant, {cascade: true})
    ingredient_types: IngredientType[];

    @OneToMany(type => Hall, hall => hall.restaurant, {cascade: false})
    halls: Hall[];

    @OneToMany(type => Cat, cat => cat.restaurant, {cascade: false})
    cats: Cat[];

    @OneToMany( type => RestaurantFeeConfig, fee => fee.restaurant, {cascade: true})
    fees: RestaurantFeeConfig[]
}
