import {IsEnum, IsNumber, IsOptional} from "class-validator";
import {BalanceType, PaymentType} from "../../../model/orm/transaction.entity";

export class CreatePaymentLinkDto {
    @IsNumber()
    restaurant_id: number;

    @IsNumber()
    amount: number;

    @IsEnum(PaymentType)
    type: PaymentType;

    @IsNumber()
    @IsOptional()
    order_id?: number;

    @IsOptional()
    @IsEnum(BalanceType)
    balance_type?: BalanceType;
}