import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IOrderNeedProducts} from "src/app/model/dto/order.need.products.interface";
import {Employee} from "src/app/model/orm/employee.model";
import {Lang} from "src/app/model/orm/lang.model";
import {Order} from "src/app/model/orm/order.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {AuthService} from "src/app/services/auth.service";
import {OrderRepository} from "src/app/services/repositories/order.repository";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {SocketService} from "src/app/services/socket.service";
import {GroupEntity} from "../../../../model/orm/grouped.orders.model";

@Component({
  selector: "index-my-orders-page",
  templateUrl: "index.my.orders.page.html",
  styleUrls: ["../../styles/orders.scss"],
})
export class IndexMyOrdersPage implements OnInit, OnDestroy {
  public langSubscription: Subscription = null;
  public authSubscription: Subscription = null;
  private socketSubscription: Subscription = null;
  public groups: GroupEntity[] = []
  public olReady: boolean = false;

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private orderRepository: OrderRepository,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get employee(): Employee {
    return this.authService.authData.value.employee;
  }

  get restaurantId(): number {
    return this.employee.restaurant_id;
  }

  queryParams(item: GroupEntity) {
    if (item.hall) {
      return {table_id: item.id}
    } else if (item.floor) {
      return {room_id: item.id}
    }
  }

  public ngOnInit(): void {
    this.socketOnCreated = this.socketOnCreated.bind(this);
    this.socketOnUpdated = this.socketOnUpdated.bind(this);
    this.socketOnNeedWaiter = this.socketOnNeedWaiter.bind(this);
    this.socketOnNeedInvoice = this.socketOnNeedInvoice.bind(this);
    this.socketOnNeedProducts = this.socketOnNeedProducts.bind(this);
    this.socketOnCancelled = this.socketOnCancelled.bind(this);
    this.socketOnCompleted = this.socketOnCompleted.bind(this);
    this.socketOnDeleted = this.socketOnDeleted.bind(this);
    this.initAuthCheck();
    this.initTitle();
    this.initSocket();
    this.initOrders();
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.socketSubscription.unsubscribe();
    this.socketService.socket?.off(`created-${this.restaurantId}`, this.socketOnCreated);
    this.socketService.socket?.off(`updated-${this.restaurantId}`, this.socketOnUpdated);
    this.socketService.socket?.off(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
    this.socketService.socket?.off(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
    this.socketService.socket?.off(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
    this.socketService.socket?.off(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
    this.socketService.socket?.off(`completed-${this.restaurantId}`, this.socketOnCompleted);
    this.socketService.socket?.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);
  }

  private initTitle(): void {
    this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][lang.slug]));
  }

  private initAuthCheck(): void {
    this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
  }

  private async initOrders(): Promise<void> {
    try {
      const groups = await this.orderRepository.loadGroupsAll(this.restaurantId, this.employee.id);
      this.groups = [...groups.tables, ...groups.rooms]
      this.olReady = true;
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private async initSocket(): Promise<void> {
    await this.appService.pause(1);
    this.socketService.qMy = 0;
    this.socketSubscription = this.socketService.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
      if (connected) {
        this.socketService.socket.on(`created-${this.restaurantId}`, this.socketOnCreated);
        this.socketService.socket.on(`updated-${this.restaurantId}`, this.socketOnUpdated);
        this.socketService.socket.on(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
        this.socketService.socket.on(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
        this.socketService.socket.on(`need-products-${this.restaurantId}`, this.socketOnNeedProducts); // сообщение с указанием employee.id!
        this.socketService.socket.on(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
        this.socketService.socket.on(`completed-${this.restaurantId}`, this.socketOnCompleted);
        this.socketService.socket.on(`deleted-${this.restaurantId}`, this.socketOnDeleted);
      }
    });
  }

  // сообщения сокетов
  private async socketOnCreated(data: Order): Promise<void> {
    if (data.employee_id === this.employee.id) {
      let group = this.findGroup(data)

      if (group) { // try to find and update existing table/room
        group.orders.push(new Order().build(data))
      } else { // load list otherwise
        await this.initOrders()
        group = this.findGroup(data)
      }

      group._highlight = true
      setTimeout(() => group._highlight = false, 3_000)

    }
  }

  private async socketOnUpdated(data: Order): Promise<void> {
    const [group, index] = this.findOrder(data.id)

    // при апдейте мы не знаем, привязан этот заказ к сотруднику или нет, поэтому ищем и либо добавляем, либо удаляем, либо заменяем
    if (group && index) { // заказ уже был в списке
      if (data.employee_id === this.employee.id) {
        group[index] = new Order().build(data)
      } else {
        this.removeOrder(data.id)
      }
    } else { // заказа не было в списке
      this.socketOnCreated(data);
    }
  }

  private async socketOnNeedWaiter(data: Order): Promise<void> {
    let entity = this.findGroup(data)
    if (!data || !entity) return

    entity.need_waiter = true;
    entity._highlightNeedWaiter = true;
    setTimeout(() => {
      entity._highlightNeedWaiter = false
    }, 3000)
  }

  private async socketOnNeedInvoice(data: Order): Promise<void> {
    let entity = this.findGroup(data)
    if (!data || !entity) return

    entity.need_invoice = true;
    entity._highlightNeedInvoice = true;
    setTimeout(() => {
      entity._highlightNeedInvoice = false
    }, 3000)
  }

  private async socketOnNeedProducts(data: IOrderNeedProducts): Promise<void> {
    let entity = this.findGroup(data.order)
    if (!data || !entity) return

    entity.need_products = true;
    entity._highlightNeedProducts = true;
    setTimeout(() => {
      entity._highlightNeedProducts = false
    }, 3000)
  }

  private socketOnCancelled(order_id: number): void {
    this.removeOrder(order_id)
  }

  private socketOnCompleted(order_id: number): void {
    this.removeOrder(order_id)
  }

  private socketOnDeleted(order_id: number): void {
    this.removeOrder(order_id)
  }

  private removeOrder(order_id: number) {
    for (let g of this.groups) {
      const index = g.orders.findIndex(o => o.id === order_id);
      index !== -1 ? g.orders.splice(index, 1) : null;
    }
  }

  private findOrder(order_id: number): [GroupEntity, number] {
    for (let g of this.groups) {
      const index = g.orders.findIndex(o => o.id === order_id);
      if (index !== -1) {
        return [g, index]
      }
    }
    return [null, null]
  }

  private findGroup(order: Order): GroupEntity {
    return this.groups.find(g => g.id === order.table_id || g.id === order.room_id)
  }
}
