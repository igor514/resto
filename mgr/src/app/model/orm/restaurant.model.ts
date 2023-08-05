import {Model} from "../model";
import {Cat} from "./cat.model";
import {RestaurantFeeConfig} from "./payment.fee.config";

export class Restaurant extends Model {
  public id: number;
  public currency_id: number;
  public lang_id: number;
  public name: string;
  public domain: string;
  public ownername: string;
  public type_id: number;
  public phone: string;
  public address: string;
  public inn: string;
  public ogrn: string;
  public comment: string;
  public money: number;
  public active: boolean;
  public created_at: Date;

  public cats?: Cat[];
  public fees?: RestaurantFeeConfig[];

  get formattedCreatedAt(): string {
    return this.created_at ? `${this.twoDigits(this.created_at.getDate())}.${this.twoDigits(this.created_at.getMonth() + 1)}.${this.created_at.getFullYear()} ${this.twoDigits(this.created_at.getHours())}:${this.twoDigits(this.created_at.getMinutes())}` : "";
  }

  public build(o: Object): any {
    for (let field in o) {
      if (field === "active_until" || field === "prolonged_at" || field === "created_at") {
        this[field] = o[field] ? new Date(o[field]) : null;
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }

  public init(paymentTypes: string[]): Restaurant {
    this.currency_id = 1;
    this.lang_id = 1;
    this.money = 0;
    this.active = true;

    this.fees = paymentTypes.map(type => {
      return new RestaurantFeeConfig().init(type)
    })

    return this;
  }
}
