import { Model } from '../model';
import {Floor} from './floor.model';
import {Order} from './order.model';
import {RoomType} from "./room.type.model";

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
  public orders: Order[] = [];

  public type: RoomType;

  public init(): Room {
    this.no = '';
    this.capacity = 0;
    this.x = 0;
    this.y = 0;
    this.orders = [];
    this.code = this.randomString(10, "lowercase");

    return this;
  }
}
