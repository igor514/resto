export interface IEmployeeCreate {    
    readonly restaurant_id: number;    
    readonly employee_status_id: number;
    readonly email: string;    
    readonly password: string;
    readonly name: string;    
    readonly phone: string;    
    readonly is_admin: boolean;        
}