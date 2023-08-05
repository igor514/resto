import {PaymentMethod} from "../../../utils/constants";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class RestaurantFee{
    @IsNumber()
    @IsOptional()
    restaurant_id?: number;
    @IsString()
    payment_type: PaymentMethod;
    @IsNumber()
    vat_order: number;
    @IsNumber()
    tax_order: number;
    @IsNumber()
    service_fee_order: number;
    @IsNumber()
    gateway_fee_order: number;

    @IsString()
    @IsOptional()
    secret_key?: string

    @IsBoolean()
    tax_order_disabled: boolean;
    @IsBoolean()
    vat_order_disabled: boolean;
    @IsBoolean()
    service_fee_order_disabled: boolean;
    @IsBoolean()
    gateway_fee_order_disabled: boolean;
}