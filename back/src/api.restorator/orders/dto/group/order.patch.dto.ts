import {IsArray, IsNumber, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import {IOrderProduct} from "../order.product.interface";

export class IOrderPatch {
    @IsNumber()
    id: number;

    @IsOptional()
    employee_comment: string

    @IsArray()
    @IsOptional()
    @Type(() => IOrderProduct)
    products: IOrderProduct[]
}