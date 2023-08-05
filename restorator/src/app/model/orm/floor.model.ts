import { Model } from "../model";
import {Room} from "./room.model";

export class Floor extends Model {
  public id: number;
  public restaurant_id: number;
  public number: number;
  public nx: number;
  public ny: number;

  public rooms: Room[];

  public init(restaurant_id: number): Floor {
    this.restaurant_id = restaurant_id;
    this.number = 1;
    this.nx = 5;
    this.ny = 5;

    return this;
  }
}
