import {RestaurantFee} from "./restaurant.fee";

export class IRestaurant {
    id: number;
    currency_id: number;
    lang_id: number;
    name: string;
    domain: string;
    ownername: string;
    phone: string;
    address: string;
    inn: string;
    ogrn: string;
    comment: string;
    money: number;
    active: boolean;
    created_at: Date;
    currency: string;

    employees_q?: number;
    daysleft?: number;
    fees: RestaurantFee[];

    constructor(partial: Partial<IRestaurant>) {
        Object.assign(this, partial);
    }
}