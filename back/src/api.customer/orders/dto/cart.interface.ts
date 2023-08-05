import { ICartRecord } from "./cartrecord.interface";

export interface ICart {
    readonly records: ICartRecord[];
    readonly serving_id: number;
    readonly comment: string;    
}
