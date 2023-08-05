import { Model } from "../model";
import { Word } from "./word.model";

export class Wordbook extends Model {
    public id: number;
    public name: string;
    public pos: number;
    public words?: Word[];

    public init(): Wordbook {
        this.pos = 0;
        this.words = [];
        return this;
    }
}
