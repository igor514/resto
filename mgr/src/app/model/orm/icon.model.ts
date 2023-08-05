import { Model } from "../model";
import { IIconTranslation } from "./icon.translation.interface";
import { Lang } from "./lang.model";

export enum IconType {
  Category = 'category',
  QR = 'qr',
}


export class Icon extends Model {
    public id: number;
    public img: string;
    public pos: number;
    public type: IconType;
    public translations?: IIconTranslation[];

    public init(ll: Lang[]): Icon {
        this.pos = 0;
        this.type = IconType.Category
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));
        return this;
    }

    public translationByLang(lang_id: number): IIconTranslation {
        return this.translations.find(t => t.lang_id === lang_id);
    }
}
