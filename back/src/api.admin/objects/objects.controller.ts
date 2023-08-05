import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { AdminsGuard } from "src/common/guards/admins.guard";
import { IUpdateParam } from "src/model/dto/updateparam.interface";

@Controller('admin/objects')
export class ObjectsController {
    constructor (private objectsService: ObjectsService) {}

    // update parameter of any object    
    @UseGuards(AdminsGuard)
    @Post("update-param")    
    public updateParam (@Body() dto: IUpdateParam): Promise<IAnswer<void>> {
        return this.objectsService.updateParam(dto);
    }

    // update "egoistic" parameter of any object ("egoistic" means that only one can be true in table)   
    @UseGuards(AdminsGuard)
    @Post("update-egoistic-param")    
    public updateEgoisticParam (@Body() dto: IUpdateParam): Promise<IAnswer<void>> {
        return this.objectsService.updateEgoisticParam(dto);
    }   
}
