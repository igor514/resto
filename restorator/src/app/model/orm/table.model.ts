import { Model } from '../model';

export class Table extends Model {
    public id: number;
    public hall_id: number;
    public no: number;
    public seats: number;
    public x: number;
    public y: number;
    public code: string;

    public init(): Table {
        this.id = null;
        this.no = 0;
        this.seats = 1;
        this.x = null;
        this.y = null;
        this.code = this.randomString(10, "lowercase");
        
        return this;
    }
}