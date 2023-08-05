import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {FacilityTypesController} from "./facility.types.controller";
import {FacilityTypesService} from "./facility.types.service";
import {FacilityType} from "../../model/orm/facility.type.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([FacilityType])
    ],
    providers: [FacilityTypesService],
    controllers: [FacilityTypesController],
})
export class FacilityTypesModule {
}
