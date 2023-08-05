import { Model } from "../model";

export enum IconType {
  Category = 'category',
  QR = 'qr',
}
export class Icon extends Model {
    public id: number;
    public img: string;
    public pos: number;
    public type: IconType;
    public name?: Object;
}
