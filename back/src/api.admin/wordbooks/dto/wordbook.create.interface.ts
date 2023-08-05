import { Word } from "src/model/orm/word.entity";

export interface IWordbookCreate {    
    readonly name: string;
    readonly pos: number;
    readonly words: Word[];    
}
