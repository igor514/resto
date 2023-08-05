import { Model } from '../model';
import {Restaurant} from "./restaurant.model";
import {Room} from "./room.model";

export class Floor extends Model {
  public id: number;
  public restaurant_id: number;
  public number: number;
  public nx: number;
  public ny: number;

  public restaurant?: Restaurant;
  public rooms?: Room[];

  public init(): Floor {
    this.restaurant_id = null;
    this.number = 1;
    this.nx = 5;
    this.ny = 5;
    this.rooms = [];

    return this;
  }
}
