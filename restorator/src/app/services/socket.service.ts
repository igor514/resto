import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { IOrderNeedProducts } from "../model/dto/order.need.products.interface";
import { Order } from "../model/orm/order.model";
import { IWSServer } from "../model/orm/wsserver.interface";
import { AppService } from "./app.service";
import { AuthService } from "./auth.service";
import { SoundService } from "./sound.service";
import {nanoid} from "nanoid";
import {PaymentsService} from "./payments.service";

// в этом проекте используется расширяемый массив сокет-серверов, на каждом из которых ограниченное количество допустимых соединений
// основной API отправляет сообщения по http на все сокет-серверы, а клиентские приложения получают эти сообщения с того сокет-сервера, к которому сейчас подключены
@Injectable()
export class SocketService {
    protected readonly apiVersion = 1
    public servers: IWSServer[] = [];
    private serverIndex: number = 0;
    public socket: Socket = null;
    public socketConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
    // количество событий
    public qNew: number = 0;
    public qMy: number = 0;
    public readonly RECONNECT_TIMEOUT = 1_000

    private _clientId: string;
    get clientId(): string {
      if (!this._clientId) {
        this._clientId = nanoid();
      }
      return this._clientId;
    }

    constructor(
        private appService: AppService,
        private authService: AuthService,
        private soundService: SoundService,
        private paymentService: PaymentsService,
    ) {}

    get employeeId(): number {return this.authService.authData.value.employee.id;}
    get restaurantId(): number {return this.authService.authData.value.employee.restaurant_id;}
    get newOrdersActive(): boolean {return this.appService.url[1] === 'orders' && this.appService.url[2] === 'new';}
    get myOrdersActive(): boolean {return this.appService.url[1] === 'orders' && this.appService.url[2] === 'my';}

    public connect(): void {
        if (this.serverIndex < this.servers.length) {
            this.socket = io(this.servers[this.serverIndex].url, {
              transports: ['websocket'],
              path: `/v${this.apiVersion}/socket`, auth: {
                id: this.clientId
              }});
            this.initEvents();
        }
    }

    public disconnect(): void {
        this.socket.off();
        this.socket.offAny();
        this.socket.disconnect();
        console.log("socket disconnected");
    }

  private initEvents(): void {
    this.socket.on("connect", () => {
      console.log("socket connected");
      this.socketConnected.next(true);
      // после коннекта можно вешать обработчики сообщений, до коннекта это работать не будет
      this.socket.on(`created-${this.restaurantId}`, (data: Order, callback: Function) => {
        this.onCreated(data);
        if (typeof callback === 'function') {
          callback(this.clientId);
        }
      });
      this.socket.on(`need-waiter-${this.restaurantId}`, (data: Order, callback: Function) => {
        this.onNeedWaiter(data);
        if (typeof callback === 'function') {
          callback(this.clientId);
        }
      });
      this.socket.on(`need-invoice-${this.restaurantId}`, (data: Order, callback: Function) => {
        this.onNeedInvoice(data);
        if (typeof callback === 'function') {
          callback(this.clientId);
        }
      });
      this.socket.on(`need-products-${this.restaurantId}`, (data: IOrderNeedProducts, callback: Function) => {
        this.onNeedProducts(data);
        if (typeof callback === 'function') {
          callback(this.clientId);
        }
      });
    });
    this.socket.onAny((eventName: string, args: object) => {
      if (!eventName.includes('balance-recharged-')) {
        return;
      }
      const payment_link = eventName.replace('balance-recharged-', '');
      if (this.paymentService.getRecharge(payment_link)) {
        const recharge = this.paymentService.completeRecharge(payment_link);
        const payload = args as {amount: number};
        if (recharge) {
          this.paymentService.recharge$.next({...recharge, amount: payload.amount});
        }
      }
    });
    this.socket.on("disconnect", (reason) => this.reconnect(reason));
    this.socket.on("connect_error", (error) => this.reconnect(error.name));
    this.socket.on("connect_timeout", (reason) => this.reconnect(reason));
  }

    // если не удалось соединиться с сокет-сервером - отключаемся, делаем паузу и пробуем соединиться со следующим сервером из списка
    private async reconnect(disconnectReason: string): Promise<void> {
        this.socketConnected.next(false);
        this.disconnect();
        console.log(`${disconnectReason} reconnecting socket...`)
        await this.appService.pause(this.RECONNECT_TIMEOUT);
        this.serverIndex = this.nextServer
        this.connect();
    }

    /*
    // события сокетов можно превратить в observable
    public on<T>(eventName: string): Observable<T> {
        return new Observable<T>(observer => {
            this.socket.off(eventName); // unsubscribe previous subscriptions to prevent multiple subscription
            this.socket.on(eventName, (res: T) => observer.next(res));
        });
    }
    */

    // попытка получить следующий сервер
    private get nextServer(): number {
      return this.serverIndex < this.servers.length - 1 ? this.serverIndex + 1 : 0;
    }

    private onCreated(data: Order): void {
        this.soundService.alertOrderCreated();
        !data.employee_id && !this.newOrdersActive ? this.qNew++ : null; // заказ не привязан к сотруднику, и мы не в новых заказах
        data.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null; // заказ привязан к текущему сотруднику, и мы не в моих заказах
    }

    private onNeedWaiter(data: Order): void {
        this.soundService.alertOrderUpdated();
        !data.employee_id && !this.newOrdersActive ? this.qNew++ : null;
        data.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null;
    }

    private onNeedInvoice(data: Order): void {
        this.soundService.alertOrderUpdated();
        !data.employee_id && !this.newOrdersActive ? this.qNew++ : null;
        data.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null;
    }

    private onNeedProducts(data: IOrderNeedProducts): void {
        this.soundService.alertOrderUpdated();
        !data.order.employee_id && !this.newOrdersActive ? this.qNew++ : null;
        data.order.employee_id === this.employeeId && !this.myOrdersActive ? this.qMy++ : null;
    }
}
