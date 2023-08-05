import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus, Paymethod } from "src/app/model/orm/order.model";
import { IOrderProduct } from "src/app/model/orm/order.product.interface";
import { IServing } from "src/app/model/orm/serving.interface";
import { Table } from "src/app/model/orm/table.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {Floor} from "../../../../model/orm/floor.model";
import {Room} from "../../../../model/orm/room.model";

@Component({
    selector: "the-order",
    templateUrl: "order.component.html",
})
export class OrderComponent implements OnInit, OnDestroy {
    @Input() x: Order;
    @Input() hl: Hall[] = [];
    @Input() sl: IServing[] = [];
    @Input() el: Employee[] = [];
    @Input() fl: Floor[] = [];
    @Input() adminMode: boolean = true; // режим для администратора
    @Input() loading: boolean = false;
    @Input() cmdSave: BehaviorSubject<boolean> = null;

    @Output() save: EventEmitter<void> = new EventEmitter();
    @Output() cancel: EventEmitter<void> = new EventEmitter();
    @Output() complete: EventEmitter<void> = new EventEmitter();

    @Input() confirmSave = true;
    @Input() confirmCancel = true;
    @Input() confirmComplete = true;

    @Input() showSave = true;
    @Input() showCancel = false;
    @Input() showComplete = true;

    private cmdSaveSubscription: Subscription = null;
    public payCash: Paymethod = Paymethod.Cash;
    public payCard: Paymethod = Paymethod.Card;
    public productToDelete: IOrderProduct = null;
    public productDeleteConfirmActive: boolean = false;
    public productDeleteConfirmMsg: string = "";
    public productFinderActive: boolean = false;
    public orderCompleteConfirmActive: boolean = false;
    public orderCancelConfirmActive: boolean = false;
    public orderErrorParent: boolean = false;
    public orderErrorChild: boolean = false;
    public orderSaveConfirmActive: boolean = false;
    public statusActive: OrderStatus = OrderStatus.Active;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    // rl and rm: '==' compare string (option value) and number (model value)
    get tl(): Table[] {return this.hl.find(h => h.id == this.x.hall_id)?.tables || [];}
    get rm(): Room[] {return this.fl.find(f => f.id == this.x.floor_id)?.rooms || [];}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}

    public ngOnInit(): void {
        this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.orderOnSave() : null);
    }

    public ngOnDestroy(): void {
        this.cmdSaveSubscription?.unsubscribe();
    }

    public productOnDelete(p: IOrderProduct): void {
        this.productToDelete = p;
        this.productDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${p.name}"?`;
        this.productDeleteConfirmActive = true;
    }

    public productDelete(): void {
        this.productDeleteConfirmActive = false;
        this.x.products.splice(this.x.products.indexOf(this.productToDelete), 1);
    }

    public orderOnComplete(): void {
        if (this.confirmCancel) {
          this.orderCompleteConfirmActive = true;
        } else {
          this.orderComplete()
        }
    }
    public orderOnCancel(): void {
        if (this.confirmCancel) {
          this.orderCancelConfirmActive = true;
        } else {
          this.orderCancel()
        }
    }

    public orderComplete(): void {
        this.orderCompleteConfirmActive = false;
        this.complete.emit();
    }

    public orderCancel(): void {
      this.orderCompleteConfirmActive = false;
      this.cancel.emit();
    }

    private orderValidate(): boolean {
        let error: boolean = false;

        if (!this.x.hall_id && !this.x.floor_id) {
            this.orderErrorParent = true;
            error = true;
        } else {
            this.orderErrorParent = false;
        }

        if (!this.x.table_id && !this.x.room_id) {
            this.orderErrorChild = true;
            error = true;
        } else {
            this.orderErrorChild = false;
        }

        return !error;
    }

    public orderOnSave(): void {
        if (!this.orderValidate()) return
        if (this.confirmCancel) {
          this.orderSaveConfirmActive = true;
        } else {
          this.orderSave()
        }
    }

    public orderSave(): void {
        this.orderSaveConfirmActive = false;
        this.save.emit();
    }
}
