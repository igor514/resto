import { Model } from "../model";

export class EmployeeStatus extends Model {
    public id: number;
    public color: string;
    public pos: number;    
    public name: Object;    
}