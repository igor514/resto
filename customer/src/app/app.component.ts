import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AppService} from './services/app.service';
import {GTService} from './services/gt.service';
import {ServingRepository} from './services/repositories/serving.repository';
import {WordRepository} from './services/repositories/word.repository';
import {RouteInjector} from './common.components/route-injector/route-injector';
import {PaymentService} from './services/payment.service';
import {SocketService} from './services/socket.service';
import {WSServerRepository} from './services/repositories/wsserver.repository';
import {IOrder} from './model/orm/order.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends RouteInjector implements OnInit, AfterViewInit {
  @ViewChild('win', {static: false}) winRef: ElementRef;
  public wordsReady = false;
  public socketReady = false;
  public ordersReady = false;
  public servingsReady = false;
  public targetNotFound = false;

  constructor(
    private wordRepository: WordRepository,
    private servingRepository: ServingRepository,
    private router: Router,
    private appService: AppService,
    protected injector: Injector,
    private gtService: GTService,
    private ngZone: NgZone,
    private socketService: SocketService,
    private wsRepository: WSServerRepository,
    private paymentService: PaymentService
  ) {
    super(injector);
    this.socketOnUpdated = this.socketOnUpdated.bind(this);
  }

  get ready(): boolean {
    return this.wordsReady && this.ordersReady && this.servingsReady && this.socketReady;
  }

  public async ngOnInit(): Promise<void> {
    if (await this.initOrder()) {
      this.initURLRoutine();
      this.initWords();
      this.initServings();
      this.initGoogleTranslate();
      this.initStripe();
      this.initSocket();
    }
  }

  private async initSocket(): Promise<void> {
    try {
      this.socketService.servers = await this.wsRepository.loadAll();
      const restaurant_id = this.orderService.target.restaurant_id;

      this.socketService.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
        if (connected) {
          this.socketService.socket.on(`updated-${restaurant_id}`, this.socketOnUpdated);
        } else {
          this.socketService.socket?.off(`updated-${restaurant_id}`, this.socketOnUpdated);
        }
      });

      this.socketService.connect();
      this.socketReady = true;
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private async socketOnUpdated(data: IOrder): Promise<void> {
    const target = this.orderService.target.id;
    if (this.orderService.order.id === data.id && (target === data.table_id || target === data.room_id)) {
      this.orderService.order = data;
    }
  }

  public ngAfterViewInit(): void {
    this.appService.win = this.winRef.nativeElement;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.appService.win.scrollTop ? setTimeout(() => {
        this.appService.win.scrollTo(0, 0);
      }, 1) : null);
  }

  private async initStripe(): Promise<void> {
    await this.paymentService.initStripe();
  }

  private async initOrder(): Promise<boolean> {
    try {
      const url = document.location.pathname.split('/');

      if ((url[1] !== 'table' && url[1] !== 'room') || !url[2]) {
        this.targetNotFound = true;
        return false;
      }

      const statusCode = await this.orderService.initTarget(url[2]);

      if (statusCode !== 200) {
        this.targetNotFound = true;
        return false;
      }

      this.orderService.initCart();
      this.orderService.initOrder();
      this.ordersReady = true;
      return true;
    } catch (err) {
      this.appService.showError(err);
      return false;
    }
  }

  private async initWords(): Promise<void> {
    try {
      this.wordRepository.lang_id = this.orderService.target.lang_id;
      await this.wordRepository.loadAll();
      this.wordsReady = true;
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private async initServings(): Promise<void> {
    try {
      this.servingRepository.lang_id = this.orderService.target.lang_id;
      await this.servingRepository.loadAll();
      this.servingsReady = true;
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private initURLRoutine(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.appService.url = event.urlAfterRedirects.split('/'));
  }

  private initGoogleTranslate(): void {
    // ссылка на angular-функцию для доступа из внешнего скрипта
    window['angularComponentReference'] = {
      component: this,
      zone: this.ngZone,
      gtInit: () => this.gtService.init(),
    };
    this.gtService.originalLang = this.orderService.target.lang_slug;
    this.gtService.prepare();
  }

  /*
  private initYandexTranslate(): void {
    this.ytService.originalLang = this.orderService.table.lang_slug;
    this.ytService.init();
  }
  */
}
