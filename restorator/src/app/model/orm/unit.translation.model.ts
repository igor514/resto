import {Model} from "../model";

export class UnitTranslation extends Model {
  id: number;
  unit_id: number;
  lang_id: number;
  name: string;
  short: string;
}
