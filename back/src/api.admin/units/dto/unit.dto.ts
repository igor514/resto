import {Unit} from "../../../model/orm/unit.entity";
import {UnitTranslation} from "../../../model/orm/unit.translation.entity";
import {IsArray, IsDecimal, IsNumber, IsOptional, ValidateNested} from "class-validator";
import {Expose, Type} from "class-transformer";
import {UnitTranslationDto} from "./unit.translation.dto";

export class UnitDto implements Partial<Unit>{

    @IsNumber()
    @IsOptional()
    @Expose()
    readonly id: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    readonly related_id: number;

    @IsNumber()
    @IsOptional()
    @Expose()
    readonly conversion_ratio: number;

    @IsArray()
    @Type(type => UnitTranslationDto)
    @ValidateNested({ each: true })
    @Expose()
    readonly translations: UnitTranslation[];
}