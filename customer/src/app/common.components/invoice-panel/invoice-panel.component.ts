import {Component, Inject, Injector} from "@angular/core";
import {IOrder, Paymethod} from "src/app/model/orm/order.interface";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {RouteInjector} from "../route-injector/route-injector";
import {PaymentService} from "../../services/payment.service";
import {GTService} from "../../services/gt.service";
import {StripeElementLocale} from "@stripe/stripe-js";
import {IOrderProduct} from "../../model/orm/order.product.interface";
import {STATIC_TOKEN} from "../../tokens";
import {PaymentDto} from "../../model/dto/payment.dto";

@Component({
  selector: "invoice-panel",
  templateUrl: "invoice-panel.component.html",
  styleUrls: ["invoice-panel.component.scss"],
})
export class InvoicePanelComponent extends RouteInjector {
  public loading: boolean = false;
  public confirmPanelActive: boolean = false;
  public alertPanelActive: boolean = false;
  // пока заказ не отправлен на оплату, т.е. не имеет статуса need_invoice, клиент меняет способ оплаты на своей стороне как угодно
  // при отправке заказа на оплату будет отправлен и способ оплаты
  public payMethod: Paymethod = Paymethod.Cash;
  public payCash: Paymethod = Paymethod.Cash;
  public payCard: Paymethod = Paymethod.Card;

  public paymentActive = false;
  public cardError = false;

  constructor(
    @Inject(STATIC_TOKEN) protected staticPath: string,
    private appService: AppService,
    protected injector: Injector,
    private wordRepository: WordRepository,
    private paymentService: PaymentService,
    private gtService: GTService,
  ) {
    super(injector);
  }

  get products(): IOrderProduct[] {
    return this.orderService.products;
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get active(): boolean {
    return this.appService.invoicePanelActive;
  }

  set active(v: boolean) {
    this.appService.invoicePanelActive = v;
  }

  get currency(): string {
    return this.orderService.target.currency_symbol;
  }

  get order(): IOrder {
    return this.orderService.order;
  }

  get orderSubtotal(): number {
    return this.orderService.orderSubtotal;
  }

  get orderTotal(): number {
    return this.orderService.orderTotal;
  }

  get orderFees(): PaymentDto {
    return this.orderService.orderFees;
  }

  get orderDiscount(): number {
    return this.order.discount_percent;
  }

  get orderCreatedAt(): string {
    const date = new Date(this.order.created_at);
    return `${this.appService.twoDigits(date.getDate())}.${this.appService.twoDigits(date.getMonth() + 1)}.${date.getFullYear()} ${this.appService.twoDigits(date.getHours())}:${this.appService.twoDigits(date.getMinutes())}`;
  }

  get substatuses(): string {
    if (this.order) {
      const sl: string[] = [];
      this.order.need_invoice ? sl.push(this.words["customer-invoice"]['need-invoice']) : null;
      this.order.need_waiter ? sl.push(this.words["customer-invoice"]['need-waiter']) : null;
      this.order.need_products ? sl.push(this.words["customer-invoice"]['need-products']) : null;
      return sl.join(", ");
    }

    return "";
  }

  public async onOrderClose(): Promise<void> {
    if (this.payMethod === this.payCard) {
      this.loading = true
      const res = await this.paymentService.createIntent(this.orderTotal, this.order.id).toPromise()
      if (res.statusCode !== 200) {
        this.appService.showError("Failed to pay, please try again")
        this.loading = false
        return
      }
      this.loading = false
      this.paymentActive = true;
      const elements = this.paymentService.stripe.elements({
        clientSecret: res.data.intent_id,
        locale: this.gtService.currentLang as StripeElementLocale,
        appearance: {theme: 'flat'}
      })

      const card = elements.create("payment", {layout: "tabs"})
      card.mount("#payment-holder")
    } else {
      this.confirmPanelActive = true;
    }
  }

  public close() {
    this.active = false;
    this.paymentActive = false;
  }

  public back() {
    this.paymentActive = false;
  }

  public async orderClose(): Promise<void> {
    try {
      this.confirmPanelActive = false;
      await this.appService.pause(300);
      this.loading = true;
      await this.orderService.orderClose(this.payMethod);
      this.loading = false;
      this.active = false;
      this.alertPanelActive = true;
      await this.appService.pause(3000);
      this.alertPanelActive = false;
    } catch (err) {
      this.appService.showError(err);
      this.loading = false;
    }
  }
}
