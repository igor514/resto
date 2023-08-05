import { Model } from "../model";
import { IEmployeeStatusTranslation } from "./employee.status.translation.interface";
import { Lang } from "./lang.model";


export class EmployeeStatus extends Model {
    public id: number;
    public color: string;
    public pos: number;    
    public translations?: IEmployeeStatusTranslation[];

    public init(ll: Lang[]): EmployeeStatus {
        this.color = "#000000";
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));                 
        return this;
    }

    public translationByLang(lang_id: number): IEmployeeStatusTranslation {        
        return this.translations.find(t => t.lang_id === lang_id);
    }
}