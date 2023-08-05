import {PaymentMethod} from "../../../utils/constants";
import {IsBoolean, IsEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class IRestaurantFee {
    @IsNumber()
    @IsOptional()
    restaurant_id?: number;

    @IsString()
    @IsOptional()
    secret_key: string;

    @IsString()
    payment_type: PaymentMethod;
    @IsNumber()
    vat_balance: number;
    @IsNumber()
    tax_balance: number;
    @IsNumber()
    gateway_fee_balance: number;
    @IsBoolean()
    tax_balance_disabled: boolean;
    @IsBoolean()
    vat_balance_disabled: boolean;
    @IsBoolean()
    gateway_fee_balance_disabled: boolean;
}