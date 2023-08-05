import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { jwtConstants } from "../../common/auth.constants";
import { UnitsController } from "./units.controller";
import {Unit} from "../../model/orm/unit.entity";
import {UnitTranslation} from "../../model/orm/unit.translation.entity";
import {CommonModule} from "../../common/common.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Unit,
            UnitTranslation,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
        CommonModule,
    ],    
    controllers: [UnitsController],
})
export class UnitsModule {}
