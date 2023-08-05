import {Injectable} from '@angular/core';
import {IRoom} from '../model/orm/room.interface';
import {OrderService} from './order.service';
import {IOrder} from '../model/orm/order.interface';
import {IOrderCreate} from '../model/dto/order.create.interface';
import {IOrderCallWaiter} from '../model/dto/order.callwaiter.interface';

@Injectable()
export class OrderHotelService extends OrderService {
  target: IRoom = null;

  protected findOrder(orders: IOrder[]): IOrder {
    return orders.find(o => o.room_id === this.target.id) || null;
  }

  public async initTarget(code: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.dataService.roomsOneByCode(code).subscribe(res => {
        res.statusCode === 200 ? this.target = res.data : null;
        resolve(res.statusCode);
      }, err => {
        reject(err.message);
      });
    });
  }

  protected orderCheckTarget(): void {
    if (this.order.room_id !== this.target.id) {
      this.dataService.roomsOneById(this.order.room_id).subscribe(res => {
        if (res.statusCode === 200) {
          window.location.href = `${window.location.origin}/room/${res.data.code}`;
        } else {
          this.orderRemoveFromStorage();
          this.initOrder();
        }
      }, err => {
        this.appService.showError(err.message);
      });
    }
  }

  protected get orderDto(): IOrderCreate {
    return {room_id: this.target.id, cart: this.cart};
  }

  protected get waiterDto(): IOrderCallWaiter {
    return {
      order_id: this.order ? this.order.id : null,
      room_id: this.order ? null : this.target.id,
    };
  }
}
