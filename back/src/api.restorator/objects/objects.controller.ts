import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IUpdateParam } from "src/model/dto/updateparam.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";

@Controller('restorator/objects')
export class ObjectsController {
    constructor (private objectsService: ObjectsService) {}

    // update parameter of any object    
    @UseGuards(EmployeesGuard)
    @Post("update-param")    
    public updateParam (@Body() dto: IUpdateParam): Promise<IAnswer<void>> {
        return this.objectsService.updateParam(dto);
    }    
}
