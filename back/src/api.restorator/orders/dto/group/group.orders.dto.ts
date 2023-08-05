import {IsNumber, ValidateIf} from "class-validator";

export class GroupOrdersDto {
    @IsNumber()
    employee_id: number;

    @IsNumber()
    @ValidateIf(o => !o.table_id)
    room_id?: number;

    @IsNumber()
    @ValidateIf(o => !o.room_id)
    table_id?: number;
}