import { Model } from '../model';

export class Setting extends Model {    
    public id: number;
    public p: string;
    public v: string;
    public c: string;
    public pos: number;
    public in_app: boolean;
    public defended: boolean;

    public init(): Setting {
        this.pos = 0;
        this.in_app = false;
        
        return this;
    }
}
