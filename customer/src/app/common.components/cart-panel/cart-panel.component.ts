import {Component, Inject, Injector} from "@angular/core";
import { Cart } from "src/app/model/cart";
import { ICartRecord } from "src/app/model/cartrecord.interface";
import { IOrder } from "src/app/model/orm/order.interface";
import { IServing } from "src/app/model/orm/serving.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { ServingRepository } from "src/app/services/repositories/serving.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {RouteInjector} from "../route-injector/route-injector";
import {PaymentDto} from "../../model/dto/payment.dto";
import {STATIC_TOKEN} from "../../tokens";

@Component({
    selector: "cart-panel",
    templateUrl: "cart-panel.component.html",
    styleUrls: ["cart-panel.component.scss"],
})
export class CartPanelComponent extends RouteInjector {
    public orderLoading: boolean = false;
    public orderConfirmPanelActive: boolean = false;
    public orderAlertPanelActive: boolean = false;

    constructor(
        protected injector: Injector,
        private appService: AppService,
        private wordRepository: WordRepository,
        private servingRepository: ServingRepository,
        @Inject(STATIC_TOKEN) protected staticPath: string,
    ) {
      super(injector);
    }

    get words(): Words {return this.wordRepository.words;}
    get active(): boolean {return this.appService.cartPanelActive;}
    set active(v: boolean) {this.appService.cartPanelActive = v;}
    get cart(): Cart {return this.orderService.cart;}
    get s(): number {return this.orderService.cartS;}
    get target() {return this.orderService.target;}
    get sl(): IServing[] {return this.servingRepository.xlAll;}
    get order(): IOrder {return this.orderService.order;}

    get payment(): PaymentDto {return this.orderService.cartFees}

    public onQuantityChanged(r: ICartRecord): void {
        r.q > 0 ? this.orderService.cartSaveToStorage() : this.orderService.cartRemoveRecord(r);
    }

    public onOrderSend(): void {
        this.orderConfirmPanelActive = true;
    }

    public async orderSend(): Promise<void> {
        try {
            this.orderConfirmPanelActive = false;
            await this.appService.pause(300);
            this.orderLoading = true;
            await this.orderService.orderSend();
            this.orderLoading = false;
            this.orderService.cartClear();
            this.active = false;
            this.orderAlertPanelActive = true;
            await this.appService.pause(3000);
            this.orderAlertPanelActive = false;
        } catch (err) {
            this.appService.showError(err);
            this.orderLoading = false;
        }
    }
}
