import { Employee } from "../orm/employee.model";

export interface IEmployeeAuthData {    
    token: string;    
    employee: Employee;
}