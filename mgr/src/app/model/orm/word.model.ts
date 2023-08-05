import { Model } from "../model";
import { Lang } from "./lang.model";
import { IWordTranslation } from "./word.translation.interface";

export class Word extends Model {    
    public id: number;
    public mark: string;
    public note: string;
    public pos: number;    
    public translations?: IWordTranslation[];

    public init(ll: Lang[]): Word {
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, text: ""}));        
        return this;
    }

    public translationByLang(lang_id: number): IWordTranslation {        
        return this.translations.find(t => t.lang_id === lang_id);
    }
}