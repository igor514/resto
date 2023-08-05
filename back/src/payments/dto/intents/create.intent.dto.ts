import {BalanceType} from "../../../model/orm/transaction.entity";
import {IsEnum, IsNumber, IsOptional} from "class-validator";

export class CreateIntentDto {

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsNumber()
    restaurant_id?: number;

    @IsOptional()
    @IsNumber()
    order_id?: number;

    @IsOptional()
    @IsEnum(BalanceType)
    type?: BalanceType;
}