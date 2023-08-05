import { Injectable } from "@angular/core";
import { IAuthData } from '../model/authdata.interface';
import { DataService } from './data.service';
import { Admin } from "../model/orm/admin.model";

@Injectable()
export class AuthService {
    constructor(private dataService: DataService) {
        let data: string = localStorage.getItem("authdata");

        if (data) {
            this.authData = JSON.parse(data);            
        }
    }

    get authData(): IAuthData {return this.dataService.authData;}
    set authData(v: IAuthData) {this.dataService.authData = v;}

    public login(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsLogin(email, password).subscribe(res => {                
                if (res.statusCode === 200) {                
                    this.authData = res.data;
                    this.save();
                    resolve();
                } else {
                    reject(res.error);                    
                }
            }, err => {
                reject(err.message);                
            });
        });        
    }
    
    public logout(): void {
        this.authData = null;
        localStorage.removeItem("authdata");                     
    }

    private save(): void {
        if (this.authData) {
            localStorage.setItem("authdata", JSON.stringify(this.authData));            
        } 
    }
    
    public updateAdmin(admin: Admin): void {
        this.authData.admin = admin;
        this.save();
    }
}
