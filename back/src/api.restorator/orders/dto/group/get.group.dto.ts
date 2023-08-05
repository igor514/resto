import {IsNumber, ValidateIf} from "class-validator";

export class GetGroupDto {
    @IsNumber()
    restaurant_id: number;
    @IsNumber()
    employee_id: number;

    @IsNumber()
    @ValidateIf(o => !o.room_id)
    table_id: number;
    @IsNumber()
    @ValidateIf(o => !o.table_id)
    room_id: number;
}