import {Body, Controller, Param, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeesService } from "./employees.service";
import { IEmployeeAuthData } from "./dto/employee.authdata.interface";
import { IEmployeeLogin } from "./dto/employee.login.interface";
import { IEmployeeLoginByEmail } from "./dto/employee.loginbyemail.interface";
import { IEmployee } from "./dto/employee.interface";
import { IEmployeeSetStatus } from "./dto/employee.setstatus.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { IEmployeeConfirm } from "./dto/employee.confirm.interface";
import { IEmployeeCreate } from "src/api.admin/employees/dto/employee.create.interface";
import { IEmployeeUpdate } from "src/api.admin/employees/dto/employee.update.interface";
import { IEmployeeUpdatePassword } from "./dto/employee.updatepassword.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { IGetAll } from "src/model/dto/getall.interface";
import { Employee } from "src/model/orm/employee.entity";
import {AuthInterceptor} from "../../common/interceptors/auth.interceptor";

@Controller('restorator/employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}                
    
    // authentication by email and password
    @Post("login")
    @UseInterceptors(AuthInterceptor)
    public login(@Body() dto: IEmployeeLogin): Promise<IAnswer<IEmployeeAuthData>> {                        
        return this.employeesService.login(dto);
    }    

    // authentication by email only (for google, apple etc.)
    @Post("login-by-email")
    public loginByEmail(@Body() dto: IEmployeeLoginByEmail): Promise<IAnswer<IEmployeeAuthData>> {                        
        return this.employeesService.loginByEmail(dto);
    }

    // check and reload
    @UseGuards(EmployeesGuard)
    @Post("check/:id")
    public check(@Param("id") id: string): Promise<IAnswer<IEmployee>> {
        return this.employeesService.check(parseInt(id));
    }

    // set status
    @UseGuards(EmployeesGuard)
    @Post("set-status")
    public setStatus(@Body() dto: IEmployeeSetStatus): Promise<IAnswer<void>> {
        return this.employeesService.setStatus(dto);
    }    

    // check pw and confirm
    @UseGuards(EmployeesGuard)
    @Post("confirm")
    public confirm(@Body() dto: IEmployeeConfirm): Promise<IAnswer<void>> {
        return this.employeesService.confirm(dto);
    }

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Employee[]>> {
        return this.employeesService.all(dto);
    }  

    // get fragment
    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<IEmployee[]>> {
        return this.employeesService.chunk(dto);
    }  

    // delete one
    @UseGuards(EmployeesGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.employeesService.delete(parseInt(id));
    }

    // create
    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IEmployeeCreate): Promise<IAnswer<void>> {
        return this.employeesService.create(dto);
    }

    // get one
    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<IEmployee>> {
        return this.employeesService.one(parseInt(id));
    }

    // update
    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IEmployeeUpdate): Promise<IAnswer<void>> {
        return this.employeesService.update(dto);
    }

    // update password
    @UseGuards(EmployeesGuard)
    @Post("update-password")
    public updatePassword(@Body() dto: IEmployeeUpdatePassword): Promise<IAnswer<void>> {
        return this.employeesService.updatePassword(dto);
    }
}
