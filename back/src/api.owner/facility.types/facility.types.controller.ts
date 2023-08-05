import {Controller, Post, Body} from "@nestjs/common";

import {FacilityTypesService} from "./facility.types.service";
import {IGetAll} from "src/model/dto/getall.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {FacilityType} from "../../model/orm/facility.type.entity";

@Controller('owner/facility-types')
export class FacilityTypesController {
    constructor(private facilityTypesService: FacilityTypesService) {
    }

    // get all    
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<FacilityType[]>> {
        return this.facilityTypesService.all(dto);
    }
}
