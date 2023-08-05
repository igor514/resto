import {IngredientType} from "../../../model/orm/ingredient.type.entity";
import {IsNotEmpty, IsNumber, IsString, NotEquals} from "class-validator";
import {Expose} from "class-transformer";

export class IngredientTypesCreateDto implements Partial<IngredientType> {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    restaurant_id: number;

    @IsNumber()
    @NotEquals(null)
    @Expose()
    price: number;

    @IsNumber()
    @NotEquals(null)
    @Expose()
    unit_id: number;
}