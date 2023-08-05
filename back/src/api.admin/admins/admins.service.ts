import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { APIService } from "../../common/api.service";
import { Admin } from "../../model/orm/admin.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAdminCreate } from "./dto/admin.create.interface";
import { IAdminUpdate } from "./dto/admin.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IAdminLogin } from "./dto/admin.login.interface";
import { IAdminAuthData } from "./dto/admin.authdata.interface";

@Injectable()
export class AdminsService extends APIService {
    constructor (
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private readonly jwtService: JwtService,    
    ) {
        super();
    }    

    public async chunk(dto: IGetChunk): Promise<IAnswer<Admin[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Admin[] = await this.adminRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.adminRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Admin>> {
        try {
            let data: Admin = await this.adminRepository.findOne({where: {id}});
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "admin not found"};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.adminRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.adminRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IAdminCreate): Promise<IAnswer<void>> {        
        try {            
            if (!dto.name || !dto.password || !dto.email) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Admin = this.adminRepository.create(dto);
            x.password = bcrypt.hashSync(x.password, 10);
            await this.adminRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
    
    public async update(dto: IAdminUpdate): Promise<IAnswer<void>> {
        try {
            if (!dto.name || !dto.email) {
                return {statusCode: 400, error: "required field is empty"};
            }            

            let x: Admin = this.adminRepository.create(dto);

            if (x.password) {                
                x.password = bcrypt.hashSync(dto.password, 10);
            } else {
                delete x.password; // if we got empty or null password, then it will not change in DB
            }

            await this.adminRepository.save(x);       
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }   
    
    public async login(dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {
        try {            
            let admin: Admin | null = await this.validateUser(dto.email, dto.password);

            if (admin) {
                const payload: Object = {username: admin.email, id: admin.id};
                return {statusCode: 200, data: {token: this.jwtService.sign(payload), admin}};
            } else {
                return {statusCode: 401, error: "Unauthorized"};
            }
        } catch (err) {
            let errTxt: string = `Error in AdminsService.login: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private async validateUser(email: string, password: string): Promise<Admin> {
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
