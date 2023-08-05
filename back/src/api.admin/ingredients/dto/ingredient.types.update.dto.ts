import {IngredientType} from "../../../model/orm/ingredient.type.entity";
import {IsNotEmpty, IsNumber, IsString, NotEquals} from "class-validator";
import {Expose} from "class-transformer";

export class IngredientTypesUpdateDto implements Partial<IngredientType> {
    @IsNumber()
    @NotEquals(null)
    @Expose()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    restaurant_id: number;

    @IsString()
    @IsNotEmpty()
    @NotEquals(null)
    @Expose()
    name: string;

    @IsNumber()
    @NotEquals(null)
    @Expose()
    price: number;

    @IsNumber()
    @NotEquals(null)
    @Expose()
    unit_id: number;
}