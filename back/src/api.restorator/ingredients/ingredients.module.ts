import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ingredient } from "src/model/orm/ingredient.entity";
import { jwtConstants } from "../../common/auth.constants";
import { IngredientTypesController } from "./ingredient.types.controller";
import { IngredientTypesService } from "./ingredient.types.service";
import {IngredientType} from "../../model/orm/ingredient.type.entity";
import {Unit} from "../../model/orm/unit.entity";
import {Employee} from "../../model/orm/employee.entity";
import {UnitTranslation} from "../../model/orm/unit.translation.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Ingredient,
            IngredientType,
            Unit,
            UnitTranslation,
            Employee
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [IngredientTypesService],
    controllers: [IngredientTypesController],
})
export class IngredientsModule {}
