import { Admin } from "../orm/admin.model";

export interface IAdminAuthData {    
    token: string;    
    admin: Admin;
}