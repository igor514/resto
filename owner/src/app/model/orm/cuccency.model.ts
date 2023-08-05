import { Model } from "../model";

export class Currency extends Model {
  public id: number;
  public name: string;
  public symbol: string;
  public pos: number;
  public defended: boolean;
}
