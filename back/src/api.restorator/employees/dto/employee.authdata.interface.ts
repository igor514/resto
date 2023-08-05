import { IEmployee } from "./employee.interface";

export interface IEmployeeAuthData {    
    readonly token: string;    
    readonly employee: IEmployee;
}