import { Model } from "../model";
import { Icon } from "./icon.model";

export class Cat extends Model {
    public id: number;
    public restaurant_id: number;
    public icon_id: number;
    public name: string;
    public pos: number;
    public active: boolean;    

    public icon?: Icon;

    public init(restaurant_id: number): Cat {
        this.restaurant_id = restaurant_id;
        this.icon_id = null;
        this.name = "";
        this.pos = 0;
        this.active = true;
        
        return this;
    }
}