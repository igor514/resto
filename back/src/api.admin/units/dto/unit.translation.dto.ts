import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {UnitTranslation} from "../../../model/orm/unit.translation.entity";
import {Expose} from "class-transformer";

export class UnitTranslationDto implements Partial<UnitTranslation> {
    @IsOptional()
    @IsNumber()
    @Expose()
    id: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    unit_id: number;

    @IsNumber()
    @Expose()
    lang_id: number;

    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    short: string;
}