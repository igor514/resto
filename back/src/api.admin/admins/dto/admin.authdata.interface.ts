import { Admin } from "../../../model/orm/admin.entity";

export interface IAdminAuthData {
    readonly admin: Admin;
    readonly token: string;    
}
