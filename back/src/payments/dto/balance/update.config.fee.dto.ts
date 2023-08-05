import {PaymentMethod} from "../../../utils/constants";
import {IsBoolean, IsEnum, IsNumber, IsOptional} from "class-validator";

export class UpdateConfigFeeDto {
    @IsEnum(PaymentMethod)
    type: PaymentMethod

    @IsOptional()
    @IsNumber()
    tax?: number;

    @IsOptional()
    @IsNumber()
    vat?: number;

    @IsOptional()
    @IsNumber()
    gateway_fee?: number;

    @IsOptional()
    @IsBoolean()
    tax_enabled?: boolean;

    @IsOptional()
    @IsBoolean()
    vat_enabled?: boolean;

    @IsOptional()
    @IsBoolean()
    gateway_fee_enabled?: boolean;
}