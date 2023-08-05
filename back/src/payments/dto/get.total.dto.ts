import {PaymentMethod} from "../../utils/constants";
import {IsEnum, IsNumber, IsOptional} from "class-validator";

export class GetTotalDto {
    @IsNumber()
    amount: number;

    @IsEnum(PaymentMethod)
    type: PaymentMethod;

    @IsOptional()
    @IsNumber()
    restaurant_id?: number;

    @IsOptional()
    @IsNumber()
    order_id?: number;
}