import { Admin } from './orm/admin.model';

export interface IAuthData {    
    token: string;    
    admin: Admin;
}