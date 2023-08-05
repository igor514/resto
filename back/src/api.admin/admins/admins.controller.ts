import {Controller, Param, Post, Body, UseGuards, UseInterceptors} from "@nestjs/common";


import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { AdminsService } from "./admins.service";
import { Admin } from "../../model/orm/admin.entity";
import { IAdminCreate } from "./dto/admin.create.interface";
import { IAdminUpdate } from "./dto/admin.update.interface";
import { IAdminLogin } from "./dto/admin.login.interface";
import { IAdminAuthData } from "./dto/admin.authdata.interface";
import {AuthInterceptor} from "../../common/interceptors/auth.interceptor";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('admin/admins')
export class AdminsController {
    constructor (private adminsService: AdminsService) {}    

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Admin[]>> {
        return this.adminsService.chunk(dto);
    }

    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Admin>> {
        return this.adminsService.one(parseInt(id));
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.adminsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.adminsService.deleteBulk(ids);
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IAdminCreate): Promise<IAnswer<void>> {
        return this.adminsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IAdminUpdate): Promise<IAnswer<void>> {
        return this.adminsService.update(dto);
    }

    // authentication by email and password
    @Post("login")
    @UseInterceptors(AuthInterceptor)
    public login(@Body() dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {                        
        return this.adminsService.login(dto);
    } 
}
