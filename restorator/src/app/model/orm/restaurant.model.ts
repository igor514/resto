import { Model } from "../model";
import { Currency } from "./currency.model";
import {FacilityType} from "./facility.type.model";

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

    public type: FacilityType;

    public currency?: Currency;
    public employees_q?: number;
    public daysleft?: number;

    public build (o: Object): any {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date (o[field]) : null;
            } else if (field === 'type') {
              this[field] = o[field] ? new FacilityType().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }
}
