import { IEmployeeStatus } from "src/api.restorator/employee.statuses/dto/employee.status.interface";
import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { IRestaurant } from "./restaurant.interface";

export interface IEmployee {
    readonly id: number;
    readonly restaurant_id: number;    
    readonly employee_status_id: number;
    readonly email: string;    
    readonly password: string;
    readonly name: string;    
    readonly phone: string;    
    readonly is_admin: boolean;    
    readonly created_at: Date;   
    readonly defended: boolean;
    readonly restaurant?: IRestaurant;
    status?: EmployeeStatus | IEmployeeStatus;
}