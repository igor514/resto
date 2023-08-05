import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";

import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { MailtemplatesService } from "./mailtemplates.service";
import { Mailtemplate } from "../../model/orm/mailtemplate.entity";
import { IMailtemplateUpdate } from "./dto/mailtemplate.update.interface";
import { IMailtemplateCreate } from "./dto/mailtemplate.create.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/mailtemplates')
export class MailtemplatesController {
    constructor (private mailtemplatesService: MailtemplatesService) {}            

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Mailtemplate[]>> {
        return this.mailtemplatesService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Mailtemplate>> {
        return this.mailtemplatesService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IMailtemplateCreate): Promise<IAnswer<void>> {
        return this.mailtemplatesService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IMailtemplateUpdate): Promise<IAnswer<void>> {
        return this.mailtemplatesService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.mailtemplatesService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.mailtemplatesService.deleteBulk(ids);
    }
}
