import {Controller, Param, Post, Body, UseGuards} from "@nestjs/common";

import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {FacilityTypesService} from "./facility.types.service";
import {IGetAll} from "src/model/dto/getall.interface";
import {AdminsGuard} from "src/common/guards/admins.guard";
import {IFacilityTypeUpdate} from "./dto/facility.types.update.interface";
import {IFacilityTypeCreate} from "./dto/facility.types.create.interface";
import {FacilityType} from "src/model/orm/facility.type.entity";

@Controller('admin/facility-types')
export class FacilityTypesController {
    constructor(private facilityTypeService: FacilityTypesService) {
    }

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<FacilityType[]>> {
        return this.facilityTypeService.all(dto);
    }

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<FacilityType[]>> {
        return this.facilityTypeService.chunk(dto);
    }

    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<FacilityType>> {
        return this.facilityTypeService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IFacilityTypeCreate): Promise<IAnswer<void>> {
        return this.facilityTypeService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IFacilityTypeUpdate): Promise<IAnswer<void>> {
        return this.facilityTypeService.update(dto);
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.facilityTypeService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.facilityTypeService.deleteBulk(ids);
    }
}
