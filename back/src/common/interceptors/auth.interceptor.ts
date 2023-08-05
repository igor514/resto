import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable, tap} from "rxjs";
import {Request} from 'express';
import {getClientIp} from 'request-ip'
import {IAnswer} from "../../model/dto/answer.interface";
import {IEmployeeAuthData} from "../../api.restorator/employees/dto/employee.authdata.interface";
import {IAdminAuthData} from "../../api.admin/admins/dto/admin.authdata.interface";
import {Log} from "../../model/orm/log.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as UAParser from 'ua-parser-js'

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const request: Request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            tap(async (value: IAnswer<IEmployeeAuthData | IAdminAuthData>) => {
                const dataE = value.data as IEmployeeAuthData
                const dataA = value.data as IAdminAuthData

                const d = new UAParser(request.headers['user-agent'])
                const device = d.getDevice(), os = d.getOS(), browser = d.getBrowser()

                const payload: Partial<Log> = {
                    ip: getClientIp(request),
                    device: [device.type, device.vendor, device.model, os.name, os.version].filter(v => !!v).join(' '),
                    browser: [browser.name, browser.version].filter(v => !!v).join(' '),
                }
                if (dataE?.employee) {
                    payload.employee_id = dataE.employee.id
                } else if (dataA?.admin) {
                    payload.admin_id = dataA?.admin.id
                } else {
                    return
                }
                await this.logRepository.save(payload)
            })
        )
    }
}