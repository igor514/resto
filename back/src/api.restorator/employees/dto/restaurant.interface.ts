import {FacilityType} from "../../../model/orm/facility.type.entity";

export interface IRestaurant {
    readonly id: number;
    readonly currency_id: number;
    readonly lang_id: number;
    readonly type_id: number;
    readonly name: string;
    readonly domain: string;
    readonly ownername: string;
    readonly phone: string;
    readonly address: string;
    readonly inn: string;
    readonly ogrn: string;
    readonly comment: string;
    readonly money: number;
    readonly active: boolean;
    readonly created_at: Date;

    type?: FacilityType;
    readonly employees_q?: number;
    daysleft?: number;
}