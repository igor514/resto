import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { jwtConstants } from "../../common/auth.constants";
import { UnitsController } from "./units.controller";
import {Unit} from "../../model/orm/unit.entity";
import {UnitTranslation} from "../../model/orm/unit.translation.entity";
import {Employee} from "../../model/orm/employee.entity";
import {CommonModule} from "../../common/common.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Unit,
            UnitTranslation,
            Employee,
        ]),
        CommonModule,
        JwtModule.register(jwtConstants),
    ],    
    controllers: [UnitsController],
})
export class UnitsModule {}
