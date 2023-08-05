import { Model } from '../model';
import {Floor} from "./floor.model";

export class Room extends Model {
  public id: number;
  public floor_id: number;
  public type_id: number;
  public no: string;
  public capacity: number;
  public x: number;
  public y: number;
  public code: string;

  public floor: Floor;
  public init(): Room {
    this.id = null;
    this.no = "1";
    this.capacity = 1;
    this.x = null;
    this.y = null;
    this.type_id = null;
    this.code = this.randomString(10, "lowercase");

    return this;
  }
}
