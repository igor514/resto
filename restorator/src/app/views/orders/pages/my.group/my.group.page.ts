import {Component, EventEmitter, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IOrderNeedProducts} from "src/app/model/dto/order.need.products.interface";
import {Employee} from "src/app/model/orm/employee.model";
import {Lang} from "src/app/model/orm/lang.model";
import {Order, OrderStatus} from "src/app/model/orm/order.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {AuthService} from "src/app/services/auth.service";
import {OrderRepository} from "src/app/services/repositories/order.repository";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {SocketService} from "src/app/services/socket.service";
import {GroupEntity} from "../../../../model/orm/grouped.orders.model";
import {take} from "rxjs/operators";
import {IGetGroup} from "../../../../model/dto/group.get.interface";
import {IGroupOrders} from "../../../../model/dto/group.orders.interface";
import {HallRepository} from "../../../../services/repositories/hall.repository";
import {ServingRepository} from "../../../../services/repositories/serving.repository";
import {Hall} from "../../../../model/orm/hall.model";
import {IServing} from "../../../../model/orm/serving.interface";
import {FloorRepository} from "../../../../services/repositories/floor.repository";
import {Floor} from "../../../../model/orm/floor.model";

@Component({
  selector: "my-group-page",
  templateUrl: "my.group.page.html",
  styleUrls: ["../../../../common.styles/data.scss", "../../styles/orders.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MyGroupPage implements OnInit, OnDestroy {
  public langSubscription: Subscription = null;
  public authSubscription: Subscription = null;
  private socketSubscription: Subscription = null;
  public group: GroupEntity = null;

  public olOrderCancelId: number = null;
  public olCancelConfirmActive: boolean = false;
  public olOrderCompleteId: number = null;
  public olCompleteConfirmActive: boolean = false;
  public olOrderToUnNeed: Order = null;
  public olPropertyToUnNeed: string = null;
  public unNeedConfirmActive: boolean = false;
  public olUnNeedConfirmMsg: string = "";

  public orderReady: boolean = false;
  public hallReady: boolean = false;
  public servingReady: boolean = false;
  public floorReady: boolean = false;

  hl: Hall[] = [];
  sl: IServing[] = [];
  fl: Floor[] = [];

  public openOrders = new Map<number, boolean>()
  public accordionEmitter = new EventEmitter<{id: number, value: boolean}>()
  public collapseEmitter = new EventEmitter<number[]>()

  public isGrouped = false;
  public isGroupInProgress = false;

  private params: Pick<IGroupOrders, 'table_id' | 'room_id'> = {}

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private orderRepository: OrderRepository,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
    private route: ActivatedRoute,
    private hallRepository: HallRepository,
    private servingRepository: ServingRepository,
    private floorRepository: FloorRepository,
  ) {}

  get words(): Words {return this.wordRepository.words;}
  get currentLang(): Lang {return this.appService.currentLang.value;}
  get employee(): Employee {return this.authService.authData.value.employee;}
  get restaurantId(): number {return this.employee.restaurant_id;}
  get ol() {return this.group.orders}

  get isReady(): boolean {
    return this.orderReady && this.floorReady && this.hallReady && this.servingReady;
  }


  public ngOnInit(): void {
    this.initSocketSubscriptions()

    this.accordionEmitter.subscribe((event) => {
      this.openOrders.set(event.id, event.value)
    })

    this.initAuthCheck();
    this.initTitle();
    this.initSocket();
    this.initServings();
    this.initHalls()
    this.initFloors()

    this.route.queryParamMap
      .pipe(take(1))
      .subscribe(paramsMap => {
        let params: MyGroupPage['params'] = {}
        if (paramsMap.has('table_id')) params.table_id = +paramsMap.get('table_id')
        if (paramsMap.has('room_id')) params.room_id = +paramsMap.get('room_id')
        this.params = params

        this.setTitle(this.currentLang)

        this.initOrders({
          restaurant_id: this.restaurantId,
          employee_id: this.employee.id,
          ...params
        });
      })
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.socketSubscription.unsubscribe();
    this.destroySocketSubscriptions()
  }

  destroySocketSubscriptions() {
    this.socketService.socket?.off(`created-${this.restaurantId}`, this.socketOnCreated);
    this.socketService.socket?.off(`updated-${this.restaurantId}`, this.socketOnUpdated);
    this.socketService.socket?.off(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
    this.socketService.socket?.off(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
    this.socketService.socket?.off(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
    this.socketService.socket?.off(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
    this.socketService.socket?.off(`completed-${this.restaurantId}`, this.socketOnCompleted);
    this.socketService.socket?.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);
  }

  initSocketSubscriptions() {
    this.socketOnCreated = this.socketOnCreated.bind(this);
    this.socketOnUpdated = this.socketOnUpdated.bind(this);
    this.socketOnNeedWaiter = this.socketOnNeedWaiter.bind(this);
    this.socketOnNeedInvoice = this.socketOnNeedInvoice.bind(this);
    this.socketOnNeedProducts = this.socketOnNeedProducts.bind(this);
    this.socketOnCancelled = this.socketOnCancelled.bind(this);
    this.socketOnCompleted = this.socketOnCompleted.bind(this);
    this.socketOnDeleted = this.socketOnDeleted.bind(this);
  }

  private initTitle(): void {
    this.langSubscription = this.appService.currentLang.subscribe(this.setTitle);
  }

  setTitle = (lang: Lang = this.currentLang) => {
    const {table_id, room_id} = this.params
    if (!table_id && !room_id) {
      this.appService.setTitle(this.words["restorator-orders"]["title-my-index"][lang.slug])
      return
    }
    const key = table_id ? "title-for-table" : "title-for-room"
    this.appService.setTitle(this.words["restorator-orders"][key][lang.slug] + ` #${table_id || room_id}`)
  }

  private initAuthCheck(): void {
    this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
  }

  collapseAll(): void {
    const ids = this.ol.map(o => o.id)
    ids.forEach((id) => this.openOrders.set(id, false))
    this.collapseEmitter.emit(ids)
  }

  public async groupOrders() {
    this.isGroupInProgress = true;
    try {
      const response = await this.orderRepository.groupOrders({...this.params, employee_id: this.employee.id})
      this.isGrouped = response.group_id !== null
    } catch(e) {
      this.isGrouped = !this.isGrouped
      this.appService.showError(e)
    }
    this.isGroupInProgress = false;
  }

  private initGroupStatus(group = this.group): void {
    let isGrouped = true
    for (let o of group.orders) {
      if (o.group_id === null) {
        isGrouped = false
        break
      }
    }
    this.isGrouped = isGrouped
  }

  private async initOrders(body: IGetGroup): Promise<void> {
    try {
      this.group = await this.orderRepository.loadGroupsOne(body);
      this.orderReady = true;
      this.initGroupStatus()
    } catch (err) {
      this.appService.showError(err);
    }
    this.orderReady = true;
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

  public olOnCancel = (o: Order): void => {
    this.olOrderCancelId = o.id;
    this.olCancelConfirmActive = true;
  }

  public async olUpdate(order: Order): Promise<void> {
    try {
      await this.orderRepository.update(order);
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public olCancel(): void {
    try {
      this.olCancelConfirmActive = false;
      this.orderRepository.cancel(this.olOrderCancelId);
      const index = this.ol.findIndex(o => o.id === this.olOrderCancelId);
      index !== -1 ? this.ol.splice(index, 1) : null;
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public onUnNeed(o: Order, p: string): void {
    this.olOrderToUnNeed = o;
    this.olPropertyToUnNeed = p;

    if (p === "need_waiter") this.olUnNeedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-waiter"][this.currentLang.slug];
    if (p === "need_products") this.olUnNeedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-products"][this.currentLang.slug];
    if (p === "need_invoice") this.olUnNeedConfirmMsg = this.words["restorator-orders"]["confirm-unneed-invoice"][this.currentLang.slug];

    this.unNeedConfirmActive = true;
  }

  public unNeed(): void {
    try {
      this.unNeedConfirmActive = false;
      this.olOrderToUnNeed[this.olPropertyToUnNeed] = false;
      this.orderRepository.updateParam(this.olOrderToUnNeed.id, this.olPropertyToUnNeed, false);
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public olOnComplete = (o: Order): void => {
    this.olOrderCompleteId = o.id;
    this.olCompleteConfirmActive = true;
  }

  public olComplete(): void {
    try {
      this.olCompleteConfirmActive = false;
      this.orderRepository.complete(this.olOrderCompleteId);
      const index = this.ol.findIndex(o => o.id === this.olOrderCompleteId);
      index !== -1 ? this.ol.splice(index, 1) : null;
    } catch (err) {
      this.appService.showError(err);
    }
  }

  // сообщения сокетов
  private async socketOnCreated(data: Order): Promise<void> {
    if (data.employee_id === this.employee.id && this.ol.findIndex(o => o.id === data.id) === -1) {
      const order = new Order().build(data);
      order._highlight = true;
      this.ol.unshift(order);
      await this.appService.pause(3000);
      order._highlight = false;
    }
  }

  private async initHalls(): Promise<void> {
    try {
      this.hl = await this.hallRepository.loadAll("pos", 1, {restaurant_id: this.restaurantId});
      this.hallReady = true
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private async initFloors(): Promise<void> {
    try {
      this.fl = await this.floorRepository.loadAll("number", 1, {restaurant_id: this.restaurantId});
      this.floorReady = true
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private async initServings(): Promise<void> {
    try {
      this.sl = await this.servingRepository.loadAll();
      this.servingReady = true
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private async socketOnUpdated(data: Order): Promise<void> {

    const index = this.ol.findIndex(o => o.id === data.id);
    if (data.table_id !== this.params.table_id && data.room_id !== this.params.room_id) {
      return
    } else if (data.status !== OrderStatus.Active) {
      return
    }

    // при апдейте мы не знаем, привязан этот заказ к сотруднику или нет, поэтому ищем и либо добавляем, либо удаляем, либо заменяем
    if (index !== -1) { // заказ уже был в списке
      if (data.employee_id === this.employee.id) {
        this.ol[index] = new Order().build(data);
      } else {
        this.ol.splice(index, 1)
      }
    } else { // заказа не было в списке
      this.socketOnCreated(data);
    }
  }

  private async socketOnNeedWaiter(data: Order): Promise<void> {
    const order = this.ol.find(o => o.id === data.id);

    if (order) {
      order.need_waiter = true;
      order._highlightNeedWaiter = true;
      await this.appService.pause(3000);
      order._highlightNeedWaiter = false;
    }
  }

  private async socketOnNeedInvoice(data: Order): Promise<void> {
    const order = this.ol.find(o => o.id === data.id);

    if (order) {
      order.need_invoice = true;
      order._highlightNeedInvoice = true;
      await this.appService.pause(3000);
      order._highlightNeedInvoice = false;
    }
  }

  private async socketOnNeedProducts(data: IOrderNeedProducts): Promise<void> {
    const order = this.ol.find(o => o.id === data.order.id);

    if (order) {
      order.need_products = true;
      order.products = [...order.products, ...data.products];
      order._highlightNeedProducts = true;
      await this.appService.pause(3000);
      order._highlightNeedProducts = false;
    }
  }

  private socketOnCancelled(data: number): void {
    const index = this.ol.findIndex(o => o.id === data);
    index !== -1 ? this.ol.splice(index, 1) : null;
  }

  private socketOnCompleted(data: number): void {
    const index = this.ol.findIndex(o => o.id === data);
    index !== -1 ? this.ol.splice(index, 1) : null;
  }

  private socketOnDeleted(data: number): void {
    const index = this.ol.findIndex(o => o.id === data);
    index !== -1 ? this.ol.splice(index, 1) : null;
  }
}
