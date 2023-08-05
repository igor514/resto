import {IsNumber, IsString} from "class-validator";

export class CreateExternalDto {
    @IsNumber()
    restaurant_id: number;
    @IsString()
    account_number: string;
}