import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Not, Repository } from "typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Admin } from "src/model/orm/admin.entity";
import { IAdminAuthData } from "./dto/admin.authdata.interface";
import { IAdminLogin } from "./dto/admin.login.interface";
import { IAdminLoginByEmail } from "./dto/admin.loginbyemail.interface";
import { IAdminUpdatePassword } from "./dto/admin.updatepassword.interface";

@Injectable()
export class AdminsService extends APIService {
    constructor (
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private jwtService: JwtService,               
    ) {
        super();
    }

    public async login(dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {
        try {            
            let admin: Admin = await this.validateAdmin(dto.email, dto.password);

            if (!admin) {
                return {statusCode: 401, error: "Unauthorized"};               
            } 

            const payload: Object = {username: admin.email, id: admin.id};
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), admin}};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.login: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async loginByEmail(dto: IAdminLoginByEmail): Promise<IAnswer<IAdminAuthData>> {
        try {
            let admin: Admin = await this.adminRepository.findOne({where: {email: dto.email}});
            
            if (!admin || !admin.active) {
                return {statusCode: 401, error: "Unauthorized"};
            }

            const payload: Object = {username: admin.email, id: admin.id};    
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), admin}};            
        } catch (err) {
            let errTxt: string = `Error in AdminsService.loginByEmail: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  
    
    public async updatePassword(dto: IAdminUpdatePassword): Promise<IAnswer<void>> {
        try {
            let admin: Admin = await this.adminRepository.findOne({where: {id: dto.id}});

            if (!admin) {
                return {statusCode: 404, error: "admin not found"}; 
            }

            admin.password = bcrypt.hashSync(dto.password, 10);
            await this.adminRepository.save(admin);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.updatePassword: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private async validateAdmin(email: string, password: string): Promise<Admin> {
        let admin: Admin = await this.adminRepository
            .createQueryBuilder("admin")
            .addSelect("admin.password")
            .where({email})
            .getOne();      
        
        if (admin && admin.active && await this.comparePassHash(password, admin.password)) {            
            delete admin.password;
            return admin;
        } else {            
            return null;
        }
    }
}