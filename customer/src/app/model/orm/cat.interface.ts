import { IIcon } from "./icon.interface";

export interface ICat {
    readonly id: number;
    readonly restaurant_id: number;
    readonly icon_id: number;
    readonly name: string;
    readonly pos: number;
    readonly active: boolean;    
    readonly icon?: IIcon;    
}