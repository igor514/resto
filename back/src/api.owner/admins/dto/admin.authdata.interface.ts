import { Admin } from "src/model/orm/admin.entity";

export interface IAdminAuthData {    
    readonly token: string;    
    readonly admin: Admin;
}