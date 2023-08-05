import { Model } from "../model";
import { Restaurant } from "./restaurant.model";

export class Cat extends Model {
    public id: number;
    public restaurant_id: number;
    public icon_id: number;
    public name: string;
    public pos: number;
    public active: boolean;

    public restaurant?: Restaurant;

    public init(): Cat {
        this.restaurant_id = null;
        this.icon_id = null;
        this.pos = 0;
        this.active = true;
        
        return this;
    }
}