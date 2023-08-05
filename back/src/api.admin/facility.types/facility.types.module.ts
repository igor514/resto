import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { jwtConstants } from "../../common/auth.constants";
import { FacilityTypesController } from "./facility.types.controller";
import { FacilityTypesService } from "./facility.types.service";
import {FacilityType} from "../../model/orm/facility.type.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FacilityType,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [FacilityTypesService],
    controllers: [FacilityTypesController],
})
export class FacilityTypesModule {}
