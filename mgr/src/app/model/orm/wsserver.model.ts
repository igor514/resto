import { Model } from "../model";

export class WSServer extends Model {
    public id: number;
    public url: string;
    public pos: number;

    public init(): WSServer {
        this.pos = 0;
        return this;
    }
}