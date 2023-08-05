import { Model } from "../model";
import { Lang } from "./lang.model";
import { IServingTranslation } from "./serving.translation.interface";

export class Serving extends Model {
    public id: number;    
    public pos: number;    
    public defended: boolean;
    public translations?: IServingTranslation[];

    public init(ll: Lang[]): Serving {
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));                 
        return this;
    }

    public translationByLang(lang_id: number): IServingTranslation {        
        return this.translations.find(t => t.lang_id === lang_id);
    }
}