import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy, OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Lang} from 'src/app/model/orm/lang.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {AuthService} from 'src/app/services/auth.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, take} from 'rxjs/operators';
import {PaymentsService} from "../../services/payments.service";
import {PaymentDto} from "../../model/dto/payment.dto";

@Component({
  selector: 'the-recharge',
  templateUrl: 'recharge.component.html',
  styleUrls: ['../../common.styles/popup.scss'],
})
export class RechargeComponent implements OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('submitBtn') submitBtn: ElementRef<HTMLButtonElement>;

  get restaurant(): Restaurant {
    return this.authService.authData.value?.employee?.restaurant;
  }

  @Input() active = false;
  @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
  @Output() recharged: EventEmitter<void> = new EventEmitter();
  public amount = 0;
  public formLoading = false;
  public formErrorAmount = false;
  public formError401 = false;
  public amountSub: Subscription;
  public submitSub: Subscription;

  public amountFees: PaymentDto;

  @ViewChild('amountInput') amountInput: ElementRef<HTMLInputElement>;

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private authService: AuthService,
    private paymentsService: PaymentsService,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get currency(): string {
    return this.paymentsService.balanceCurrency.symbol;
  }

  initAmountListener(): void {
    this.amountSub = fromEvent(this.amountInput.nativeElement, 'keydown')
      .pipe(debounceTime(400))
      .subscribe((event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = parseInt(target.value || '0', 10);
        if (value <= 0) {
          this.amountFees = new PaymentDto().init(value);
        } else {
          this.paymentsService.getBalanceTotal(value, this.restaurant.id)
            .pipe(take(1))
            .subscribe(data => {
              this.amountFees = data.data;
            });
        }
      });
  }

  public ngOnDestroy(): void {
    this?.amountSub?.unsubscribe();
    this.submitSub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initAmountListener()
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.amount = 0;
  }

  public close(): void {
    this.amount = 0;
    this.amountFees = null;
    this.submitSub?.unsubscribe();
    this.appService.rechargePanelActive = false;
  }

  public async apply(): Promise<void> {
    try {
      if (this.validate()) {
        this.paymentsService
          .createPaymentLink({restaurant_id: this.restaurant.id, amount: this.amount})
          .subscribe(response => {
            this.paymentsService.addRecharge(response.data.id, this.restaurant.id);
            this.close();
            window.open(response.data.url, "_blank");
          });
      }
    } catch (err) {
      this.appService.showError(err);
      this.formLoading = false;
    }
  }

  public validate(): boolean {
    let error = false;

    if (!this.amount || this.amount <= 0) {
      this.formErrorAmount = true;
      error = true;
    } else {
      this.formErrorAmount = false;
    }

    return !error;
  }
}
