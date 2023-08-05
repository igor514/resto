import {IsNumber} from "class-validator";

export class GetGroupsDto {
    @IsNumber()
    restaurant_id: number;
    @IsNumber()
    employee_id: number;
}