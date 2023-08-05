export interface IRoom {
    readonly id: number;
    readonly no: string;
    readonly capacity: number;
    readonly code: string;    
    readonly floor_id: number;
    readonly restaurant_id: number;
    readonly lang_id: number;
    readonly lang_slug: string;
    readonly currency_symbol: string;
}