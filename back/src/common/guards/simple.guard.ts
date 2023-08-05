import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SimpleGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    public canActivate(context: ExecutionContext): boolean {        
        try {
            let token: string = context.switchToHttp().getRequest().headers["token"];        
            this.jwtService.verify(token);            
            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: "unauthorized"}, 200);
        }        
    }
}