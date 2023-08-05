import { Model } from "../model";
import { Restaurant } from "./restaurant.model";

export class Employee extends Model {
    public id: number;
    public restaurant_id: number;    
    public employee_status_id: number;
    public email: string;    
    public password: string;
    public name: string;    
    public phone: string;    
    public is_admin: boolean;    
    public created_at: Date;   
    public defended: boolean;
    public restaurant?: Restaurant;

    get formattedCreatedAt(): string {return `${this.twoDigits(this.created_at.getDate())}.${this.twoDigits(this.created_at.getMonth()+1)}.${this.created_at.getFullYear()} ${this.twoDigits(this.created_at.getHours())}:${this.twoDigits(this.created_at.getMinutes())}`;}

    public build (o: Object): any {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date (o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    public init(): Employee {        
        this.is_admin = true;
        this.email = "";
        this.password = "";     
        this.defended = true;   
        return this;
    }
}