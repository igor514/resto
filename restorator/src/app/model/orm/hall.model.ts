import { Model } from "../model";
import { Table } from "./table.model";

export class Hall extends Model {
    public id: number;
    public restaurant_id: number;
    public name: string;
    public nx: number;
    public ny: number;
    public pos: number;  
    
    public tables: Table[];
    
    public init(restaurant_id: number): Hall {
        this.restaurant_id = restaurant_id;
        this.name = "";
        this.nx = 5;
        this.ny = 5;
        this.pos = 0;        

        return this;
    }
}