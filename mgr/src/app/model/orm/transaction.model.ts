import { Model } from "../model";
import { Restaurant } from "./restaurant.model";

export enum TransactionType {
    Auto = "auto",
    Employee = "employee",
    Admin = "admin",    
}

export class Transaction extends Model {
    public id: number;
    public restaurant_id: number;
    public type: TransactionType;
    public amount: number;
    public created_at: Date;
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
}