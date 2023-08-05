import { Injectable } from "@angular/core";
import { IAdminAuthData } from "../model/dto/admin.authdata.interface";
import { IAdminLogin } from "../model/dto/admin.login.interface";
import { IAdminUpdatePassword } from "../model/dto/admin.updatepassword.interface";
import { Admin } from "../model/orm/admin.model";
import { DataService } from './data.service';
import {SocketService} from "./socket.service";

@Injectable()
export class AuthService {
    constructor(private dataService: DataService, private socketService: SocketService) {
        let data: string = localStorage.getItem("authdata");
        data ? this.init(JSON.parse(data)) : null;
    }

    get authData(): IAdminAuthData {return this.dataService.authData;}
    set authData(v: IAdminAuthData) {
      this.dataService.authData = v;
    }

    private init(data: IAdminAuthData): void {
        this.authData = {token: data.token, admin: new Admin().build(data.admin)};
    }

    public login(dto: IAdminLogin): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsLogin(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.init(res.data);
                    this.save();
                    this.socketService.connect();
                }

                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });
    }

    public loginByEmail(email: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsLoginByEmail(email).subscribe(res => {
                if (res.statusCode === 200) {
                    this.init(res.data);
                    this.save();
                    this.socketService.connect();
                }

                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });
    }

    public updatePassword(dto: IAdminUpdatePassword): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.adminsUpdatePassword(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
    }

    public logout(): void {
        this.authData = null;
        this.socketService.disconnect();
        localStorage.removeItem("authdata");
    }

    public save(): void {
        if (this.authData) {
            localStorage.setItem("authdata", JSON.stringify(this.authData));
        }
    }
}
