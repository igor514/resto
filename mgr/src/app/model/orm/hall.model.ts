import { Model } from "../model";
import { Restaurant } from "./restaurant.model";
import { Table } from "./table.model";

export class Hall extends Model {
    public id: number;
    public restaurant_id: number;
    public name: string;
    public nx: number;
    public ny: number;
    public pos: number;
    
    public restaurant?: Restaurant;
    public tables?: Table[];

    public init(): Hall {
        this.restaurant_id = null;
        this.nx = 5;
        this.ny = 5;
        this.pos = 0;
        this.tables = [];

        return this;
    }
}