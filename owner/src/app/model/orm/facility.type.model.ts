import {Lang} from './lang.model';
import {Model} from '../model';
import {IFacilityTypeTranslation} from './facility.type.translation';

export class FacilityType extends Model {
  public id: number;
  public name: string;
  public is_hotel: boolean;
  public translations?: IFacilityTypeTranslation[];

  public init(ll: Lang[]): FacilityType {
    this.translations = ll.map(l => ({lang_id: l.id, name: ""}));
    return this;
  }

  public translationByLang(lang_id: number): IFacilityTypeTranslation {
    return this.translations.find(t => t.lang_id === lang_id);
  }
}
