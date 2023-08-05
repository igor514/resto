import {IRestaurantFee} from "./restaurant.fee.inerface";
import {IsArray, IsBoolean, IsNumber, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class IRestaurantCreate {
    @IsNumber()
    readonly currency_id: number;
    @IsNumber()
    readonly lang_id: number;
    @IsString()
    readonly name: string;
    @IsString()
    readonly domain: string;
    @IsString()
    readonly ownername: string;
    @IsString()
    readonly phone: string;
    @IsString()
    readonly address: string;
    @IsString()
    readonly inn: string;
    @IsString()
    readonly ogrn: string;
    @IsString()
    readonly comment: string;
    @IsNumber()
    readonly money: number;
    @IsBoolean()
    readonly active: boolean;
    @IsNumber()
    readonly type_id: number;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IRestaurantFee)
    readonly fees: IRestaurantFee[];
}