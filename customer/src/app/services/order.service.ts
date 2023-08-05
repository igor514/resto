import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Cart} from '../model/cart';
import {ICartRecord} from '../model/cartrecord.interface';
import {IOrderAdd} from '../model/dto/order.add.interface';
import {IOrderCallWaiter} from '../model/dto/order.callwaiter.interface';
import {IOrderClose} from '../model/dto/order.close.interface';
import {IOrderCreate} from '../model/dto/order.create.interface';
import {IOrder, Paymethod} from '../model/orm/order.interface';
import {IProduct} from '../model/orm/product.interface';
import {ITable} from '../model/orm/table.interface';
import {AppService} from './app.service';
import {DataService} from './data.service';
import {IRoom} from '../model/orm/room.interface';
import {PaymentService} from './payment.service';
import {PaymentDto} from '../model/dto/payment.dto';
import {IOrderProduct} from '../model/orm/order.product.interface';

@Injectable()
export class OrderService {
  public order: IOrder = null;
  private orderCheckInteval: number = null;
  public target: ITable | IRoom = null;
  public cart: Cart = null;
  public cartFees: PaymentDto = null;
  public orderFees: PaymentDto = null;
  public cartSubject = new Subject<ICartRecord[]>();
  public orderSubject = new Subject<IOrderProduct[]>();
  public readonly REFRESH_INTERVAL = 10000;

  constructor(
    protected dataService: DataService,
    protected appService: AppService,
    protected paymentService: PaymentService,
  ) {

    this.orderSubject
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev && this.sumOrder(prev) === this.sumOrder(curr);
        }),
        debounceTime(400)
      )
      .subscribe((v) => this.getOrderTotal(v));
    this.cartSubject
      .pipe(
        debounceTime(400)
      )
      .subscribe((v) => this.getCartTotal(v));
  }

  getCartTotal(values: ICartRecord[]): void {
    if (values.length === 0) {
      this.cartFees = null;
    } else {

    this.paymentService
      .getTotal(this.sumCart(values), this.target.restaurant_id)
      .subscribe((res) => {
        this.cartFees = res.data;
      });
    }
  }

  getOrderTotal(values: IOrderProduct[] = this.order.products): void {
    if (values.length === 0) {
      this.orderFees = null;
    } else {
      const sum = this.order.products.length ? this.order.products.map(p => p.q * p.price).reduce((acc, x) => acc + x) : 0;
      this.paymentService
        .getTotal(sum, this.target.restaurant_id)
        .subscribe((res) => {
          this.orderFees = res.data;
        });
    }
  }


  get isHotel(): boolean {
    return typeof (this.target as IRoom)?.floor_id === 'number';
  }

  get isRestaurant(): boolean {
    return typeof (this.target as ITable)?.hall_id === 'number';
  }

  get category(): string {
    if (this.isHotel) {
      return 'room';
    } else {
      return 'table';
    }
  }

  get cartQ(): number {
    return this.cart.records.length ? this.cart.records.map(r => r.q).reduce((acc, x) => acc + x) : 0;
  }

  get cartS(): number {
    return this.cart.records.length ? this.sumCart(this.cart.records) : 0;
  }

  private sumCart(records: ICartRecord[] = this.cart.records): number {
    return records.map(r => r.q * r.product.price).reduce((acc, x) => acc + x);
  }

  get products(): IOrderProduct[] {
    if (this.order.group?.id) {
      return [...this.order.products, ...this.order.group.products];
    }
    return this.order.products;
  }

  get orderSubtotal(): number {
    return this.order.products.length ? this.sumOrder(this.order.products) : 0;
  }

  sumOrder(products: IOrderProduct[]): number {
    return products.map(p => p.q * p.price).reduce((acc, x) => acc + x);
  }

  get orderTotal(): number {
    return this?.order?.sum || 0
  }

  public initCart(): void {
    const data: string = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : new Cart();
    this.cartSubject.next(this.cart.records);
  }

  public cartSaveToStorage(): void {
    this.cartSubject.next(this.cart.records);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public cartClear(): void {
    this.cart = new Cart();
    this.cartSaveToStorage();
  }

  public cartAdd(product: IProduct, q: number = 1): void {
    const record: ICartRecord = this.cart.records.find(r => r.product.id === product.id);

    if (record) {
      record.q += q;
    } else {
      this.cart.records.push({product, q});
    }

    this.cartSaveToStorage();
  }

  public cartRemoveRecord(record: ICartRecord): void {
    const index: number = this.cart.records.indexOf(record);
    this.cart.records.splice(index, 1);
    this.cartSaveToStorage();
  }

  private orderSaveToStorage(): void {
    const data = localStorage.getItem('orders');
    const orders: IOrder[] = data ? JSON.parse(data) : [];
    const index = orders.findIndex(o => o.id === this.order.id);

    if (index !== -1) {
      orders[index] = this.order;
    } else {
      orders.push(this.order);
    }
    this.orderSubject.next(Array.from(Array.from(this.order.products.map(o => Object.assign({}, o)))))
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  protected orderRemoveFromStorage(): void {
    const data = localStorage.getItem('orders');
    const orders: IOrder[] = data ? JSON.parse(data) : [];
    const index = orders.findIndex(o => o.id === this.order.id);

    if (index !== -1) {
      orders.splice(index, 1);
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }

  private orderStartChecking(): void {
    this.orderCheck();
    !this.orderCheckInteval ? this.orderCheckInteval = window.setInterval(() => this.orderCheck(), this.REFRESH_INTERVAL) : null;
  }

  private orderCheck(): void {
    if (this.order) {
      this.dataService.ordersCheck(this.order.id).subscribe(res => {
        if (res.statusCode === 200) {
          this.order = res.data;
          this.orderSaveToStorage();
          this.orderCheckTarget(); // проверка на пересадку
        } else if (res.statusCode === 404) {
          this.orderRemoveFromStorage();
          this.initOrder(); // сброс (можно было бы просто занулить, но теоретически возможны случаи, когда в хранилище есть старые заказы)
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
    }
  }

  public orderAdd(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IOrderAdd = {order_id: this.order.id, cart: this.cart};
      this.dataService.ordersAdd(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.order = res.data;
          this.orderSaveToStorage();
          resolve();
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public orderClose(paymethod: Paymethod): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IOrderClose = {order_id: this.order.id, paymethod};
      this.dataService.ordersClose(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.order = res.data;
          this.orderSaveToStorage();
          resolve();
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public orderCreate(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IOrderCreate = this.orderDto;
      this.dataService.ordersCreate(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.order = res.data;
          this.orderSaveToStorage();
          resolve();
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public callWaiter(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto = this.waiterDto;
      this.dataService.ordersCallWaiter(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.order = res.data;
          this.orderSaveToStorage();
          resolve();
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }


  public orderSend(): Promise<void> {
    return this.order ? this.orderAdd() : this.orderCreate();
  }

  public initOrder(): void {
    const data: string = localStorage.getItem('orders');
    const orders: IOrder[] = data ? JSON.parse(data) : [];
    this.order = this.findOrder(orders);
    this.orderStartChecking(); // периодически проверяем актуальность и состояние заказа
  }

  // overrided methods below

  protected findOrder(orders: IOrder[]): IOrder {
    return orders.find(o => o.table_id === this.target.id) || null;
  }

  public async initTarget(code: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.dataService.tablesOneByCode(code).subscribe(res => {
        res.statusCode === 200 ? this.target = res.data : null;
        resolve(res.statusCode);
      }, err => {
        reject(err.message);
      });
    });
  }

  protected orderCheckTarget(): void {
    if (this.order.table_id !== this.target.id) {
      this.dataService.tablesOneById(this.order.table_id).subscribe(res => {
        if (res.statusCode === 200) {
          window.location.href = `${window.location.origin}/table/${res.data.code}`;
        } else { // пересадили на несуществующий стол :-)
          this.orderRemoveFromStorage();
          this.initOrder(); // сброс (можно было бы просто занулить, но теоретически возможны случаи, когда в хранилище есть старые заказы)
        }
      }, err => {
        this.appService.showError(err.message);
      });
    }
  }

  protected get orderDto(): IOrderCreate {
    return {table_id: this.target.id, cart: this.cart};
  }

  protected get waiterDto(): IOrderCallWaiter {
    return {
      order_id: this.order ? this.order.id : null,
      table_id: this.order ? null : this.target.id,
    };
  }
}
