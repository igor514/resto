export interface ICatUpdate {
    readonly id: number;
    readonly restaurant_id: number;
    readonly icon_id: number;
    readonly name: string;
    readonly pos: number;
    readonly active: boolean;
}