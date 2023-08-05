import {Model} from "../model";
import {UnitTranslation} from "./unit.translation.model";
import {Lang} from "./lang.model";

export class Unit extends Model{
  id: number;
  related_id?: number;
  conversion_ratio?: number;
  translations: UnitTranslation[];
  related: Unit;

  public init(ll: Lang[]): Unit {
    this.translations = ll.map(l => ({lang_id: l.id, name: "", short: ''}));
    return this;
  }

  public build(o: Object): Unit {
    for (const field in o) {
      if (field === "date") {
        this[field] = new Date (o[field]);
      } else if (field === 'related') {
        this.related = new Unit().build(o[field])
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }

  public translationByLang(lang_id: number): UnitTranslation {
    return this.translations.find(t => t.lang_id === lang_id);
  }
}
