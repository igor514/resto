import {PaymentMethod} from "../../../utils/constants";
import {IsEnum, IsNumber, IsOptional} from "class-validator";

export class GetFeeDto {
    @IsEnum(PaymentMethod)
    type: PaymentMethod

    @IsOptional()
    @IsNumber()
    restaurant_id?: number;
}