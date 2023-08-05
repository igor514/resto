import {Model} from '../model';
import {Employee} from './employee.model';
import {FacilityType} from './facility.type.model';
import {RestaurantFeeConfig} from './restaurant.fee.config.model';
import {Currency} from "./cuccency.model";

export class Restaurant extends Model {
  public id: number;
  public currency_id: number;
  public lang_id: number;
  public type_id: number;
  public name: string;
  public domain: string;
  public ownername: string;
  public phone: string;
  public address: string;
  public inn: string;
  public ogrn: string;
  public comment: string;
  public money: number;
  public active: boolean;
  public created_at: Date;

  public employees?: Employee[];
  public type: FacilityType;
  public currency: string;
  public employees_q?: number;
  public daysleft?: number;
  public fees: RestaurantFeeConfig[];

  get formattedCreatedAt(): string {
    return this.created_at ? `${this.twoDigits(this.created_at.getDate())}.${this.twoDigits(this.created_at.getMonth() + 1)}.${this.created_at.getFullYear()} ${this.twoDigits(this.created_at.getHours())}:${this.twoDigits(this.created_at.getMinutes())}` : '';
  }

  public build(o: Object): any {
    for (const field in o) {
      if (field === 'created_at') {
        this[field] = o[field] ? new Date(o[field]) : null;
      } else if (field === 'type') {
        this[field] = o[field] ? new FacilityType().build(o[field]) : null;
      } else if (field === 'fees') {
        this[field] = o[field] ? (o[field] as any[]).map((val) => new RestaurantFeeConfig().build(val)) : null;
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }

  public init(paymentProvides: string[]): Restaurant {
    this.currency_id = 3;
    this.lang_id = 2;
    this.name = '';
    this.domain = '';
    this.ownername = '';
    this.phone = '';
    this.address = '';
    this.inn = '';
    this.ogrn = '';
    this.money = 0;
    this.active = true;
    this.employees = [new Employee().init()];
    this.type_id = null;
    this.fees = [];
    for (const type of paymentProvides) {
      this.fees.push(new RestaurantFeeConfig().build({payment_type: type}));
    }
    return this;
  }
}
