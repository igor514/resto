import { Table } from "src/model/orm/table.entity";

export interface IHallUpdate {
    readonly id: number;
    readonly restaurant_id: number;
    readonly name: string;
    readonly nx: number;
    readonly ny: number;
    readonly pos: number;    
    readonly tables: Table[];
}