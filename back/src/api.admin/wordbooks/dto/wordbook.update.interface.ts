import { Word } from "src/model/orm/word.entity";

export interface IWordbookUpdate {
    readonly id: number;
    readonly name: string;
    readonly pos: number;
    readonly words: Word[];    
}
