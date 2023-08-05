import {Injectable, CanActivate, ExecutionContext, HttpException, ForbiddenException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "src/model/orm/employee.entity";
import {Repository} from "typeorm";

@Injectable()
export class EmployeesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const token: string = context.switchToHttp().getRequest().headers["token"];
            const data = this.jwtService.verify(token);
            const username: string = data.username;
            const id: number = data.id;
            const employee: Employee = await this.employeeRepository.findOne({
                where: {id},
                relations: ["restaurant"]
            });

            if (!employee || !employee.restaurant || !employee.restaurant.active || !(employee?.email === username)) {
                throw new ForbiddenException();
            }

            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: "unauthorized"}, 200);
        }
    }
}