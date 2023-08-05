import { Model } from "../model";
import { Lang } from "./lang.model";
import { IMailtemplateTranslation } from "./mailtemplate.translation.interface";

export class Mailtemplate extends Model {
    public id: number;
    public name: string;
    public defended: boolean;
    public translations?: IMailtemplateTranslation[];

    public init(ll: Lang[]): Mailtemplate {
        this.translations = ll.map(l => ({lang_id: l.id, content: ""}));                 
        return this;
    }

    public translationByLang(lang_id: number): IMailtemplateTranslation {        
        return this.translations.find(t => t.lang_id === lang_id);
    }
}