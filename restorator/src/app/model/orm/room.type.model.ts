import { Model } from '../model';
import {IRoomTypeTranslation} from './room.type.translation.interface';
import {Lang} from './lang.model';

export class RoomType extends Model {
  public id: number;
  public name: string;
  public priority: number;
  public translations?: IRoomTypeTranslation[];

  public init(ll: Lang[]): RoomType {
    this.priority = 1;
    this.translations = ll.map(l => ({lang_id: l.id, name: ''}));
    return this;
  }
  public translationByLang(lang_id: number): IRoomTypeTranslation {
    return this.translations.find(t => t.lang_id === lang_id);
  }
}
