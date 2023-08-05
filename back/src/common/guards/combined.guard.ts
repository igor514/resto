import { Injectable, CanActivate, ExecutionContext, HttpException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";
import { Repository } from "typeorm";
import {Admin} from "../../model/orm/admin.entity";

// Combines Employee and Admin guards to pass if user is one of them
@Injectable()
export class CombinedGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) {}


    public async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const token: string = context.switchToHttp().getRequest().headers["token"];
            const data = this.jwtService.verify(token);
            const id: number = data.id;
            const username: string = data.username
            const employee: Employee = await this.employeeRepository.findOne({
                where: {id},
                relations: ["restaurant"]
            });
            const admin: Admin = await this.adminRepository.findOne({where: {id}});

            const isNotEmployee = !employee || !employee.restaurant || !employee.restaurant.active || !(employee?.email === data.username)
            const isNotAdmin = !admin || !admin.active || !(admin?.email === username)
            if (isNotEmployee && isNotAdmin) {
                throw new ForbiddenException();
            }

            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: "unauthorized"}, 200);
        }
    }
}