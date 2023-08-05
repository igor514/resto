import { Model } from "../model";
import {Admin} from "./admin.model";
import {Employee} from "./employee.model";

export class Log extends Model {
  public id: number;
  public created_at: Date;
  public admin?: Pick<Admin, "id" | "name">
  public employee?: Pick<Employee, "id" | "name">
  public ip: string;
  public device: string;
  public browser: string;

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

  get target(): string {
    return this.admin ? 'restorator' : 'admin';
  }
}
