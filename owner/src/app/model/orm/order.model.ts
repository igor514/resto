import { Model } from "../model";

export enum OrderStatus {
    Active = "active",
    Completed = "completed",
    Cancelled = "cancelled",    
}

export enum Paymethod {
    Cash = "cash",
    Card = "card",
}

export class Order extends Model {
    public id: number;
    public table_id: number;
    public hall_id: number;
    public restaurant_id: number;
    public employee_id: number;
    public customer_comment: string;
    public employee_comment: string;
    public need_waiter: boolean;
    public need_invoice: boolean;
    public need_products: boolean;    
    public discount_percent: number;
    public sum: number;
    public status: OrderStatus;
    public paymethod: Paymethod;    
    public created_at: Date;    
    public accepted_at: Date;
    public completed_at: Date;    
    
    get formattedCreatedAt(): string {return this.created_at ? `${this.twoDigits(this.created_at.getHours())}:${this.twoDigits(this.created_at.getMinutes())} ${this.twoDigits(this.created_at.getDate())}.${this.twoDigits(this.created_at.getMonth()+1)}.${this.created_at.getFullYear()}` : "";}
    get formattedAcceptedAt(): string {return this.accepted_at ? `${this.twoDigits(this.accepted_at.getHours())}:${this.twoDigits(this.accepted_at.getMinutes())} ${this.twoDigits(this.accepted_at.getDate())}.${this.twoDigits(this.accepted_at.getMonth()+1)}.${this.accepted_at.getFullYear()}` : "";}
    get formattedCompletedAt(): string {return this.completed_at ? `${this.twoDigits(this.completed_at.getHours())}:${this.twoDigits(this.completed_at.getMinutes())} ${this.twoDigits(this.completed_at.getDate())}.${this.twoDigits(this.completed_at.getMonth()+1)}.${this.completed_at.getFullYear()}` : "";}
    
    public build (o: Object): any {
        for (let field in o) {
            if (field === "created_at" || field === "completed_at" || field === "accepted_at") {
                this[field] = o[field] ? new Date (o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }    
}