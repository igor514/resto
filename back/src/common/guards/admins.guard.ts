import { Injectable, CanActivate, ExecutionContext, HttpException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminsGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {        
        try {
            const token: string = context.switchToHttp().getRequest().headers["token"];        
            const data = this.jwtService.verify(token);
            const username: string = data.username;
            const id: number = data.id;
            const admin: Admin = await this.adminRepository.findOne({where: {id}});

            if (!admin || !admin.active || !(admin.email === username)) {
                throw new ForbiddenException();
            }
            
            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: "unauthorized"}, 200);
        }        
    }
}