import {Injector} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {OrderHotelService} from '../../services/order.hotel.service';

export class RouteInjector {
  public orderService: OrderService;

  constructor(protected injector: Injector) {
    if (document.location.pathname.split('/')[1] === 'room') {
      this.orderService = injector.get(OrderHotelService);
    } else {
      this.orderService = injector.get(OrderService);
    }
  }
}
