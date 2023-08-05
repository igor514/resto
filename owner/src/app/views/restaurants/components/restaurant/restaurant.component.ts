import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Currency} from 'src/app/model/orm/currency.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {FacilityType} from '../../../../model/orm/facility.type.model';
import {PaymentService} from "../../../../services/payment.service";
import {RestaurantFeeConfig} from "../../../../model/orm/restaurant.fee.config.model";
import {sanitizeFee} from "../../../../../utils";
import {Router} from "@angular/router";
import {RestaurantRepository} from "../../../../services/repositories/restaurant.repository";

@Component({
  selector: 'the-restaurant',
  templateUrl: 'restaurant.component.html',
})
export class RestaurantComponent implements OnInit, OnDestroy {
  @Input() x: Restaurant;
  @Input() cl: Currency[];
  @Input() pt?: string[] = []; // payment types
  @Input() ll: Lang[];
  @Input() tt: FacilityType[];
  @Input() mode = 'create';
  @Input() loading = false;
  @Input() errorEmailDuplication = false;
  @Input() cmdSave: BehaviorSubject<boolean> = null;
  @Output() save: EventEmitter<void> = new EventEmitter();

  private cmdSaveSubscription: Subscription = null;
  public errorName = false;
  public errorOwnerName = false;
  public errorPhone = false;
  public errorAddress = false;
  public errorInn = false;
  public errorOgrn = false;
  public errorEmail = false;
  public errorPassword = false;

  public currPayment: string;

  constructor(
    protected appService: AppService,
    protected wordRepository: WordRepository,
    protected paymentService: PaymentService,
    protected restaurantRepository: RestaurantRepository,
    protected router: Router,
  ) {
  }


  get currFee(): RestaurantFeeConfig {
    return this.x.fees.find(f => f.payment_type === this.currPayment);
  }

  sanitize(event: Event, key: string): void {
    const value = sanitizeFee((event.target as HTMLInputElement).valueAsNumber);
    this.x.fees.find(f => f.payment_type === this.currPayment)[key] = value;
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  public ngOnInit(): void {
    const type = this.pt?.[0];
    if (type) {
      this.currPayment = type;
    }
    this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
  }

  public ngOnDestroy(): void {
    this.cmdSaveSubscription?.unsubscribe();
  }

  public onSave(): void {
    if (this.validate()) {
      this.save.emit();
    }
  }

  private validate(): boolean {
    let error = false;

    this.x.name = this.appService.trim(this.x.name);
    this.x.ownername = this.appService.trim(this.x.ownername);
    this.x.phone = this.appService.trim(this.x.phone);
    this.x.address = this.appService.trim(this.x.address);
    this.x.inn = this.appService.trim(this.x.inn);
    this.x.ogrn = this.appService.trim(this.x.ogrn);

    if (!this.x.name.length) {
      this.errorName = true;
      error = true;
    } else {
      this.errorName = false;
    }

    if (!this.x.ownername.length) {
      this.errorOwnerName = true;
      error = true;
    } else {
      this.errorOwnerName = false;
    }

    if (!this.x.phone.length) {
      this.errorPhone = true;
      error = true;
    } else {
      this.errorPhone = false;
    }

    if (!this.x.address.length) {
      this.errorAddress = true;
      error = true;
    } else {
      this.errorAddress = false;
    }

    if (!this.x.inn.length) {
      this.errorInn = true;
      error = true;
    } else {
      this.errorInn = false;
    }

    if (!this.x.ogrn.length) {
      this.errorOgrn = true;
      error = true;
    } else {
      this.errorOgrn = false;
    }

    if (this.mode === 'create') {
      this.x.employees[0].email = this.appService.trim(this.x.employees[0].email);
      this.x.employees[0].password = this.appService.trim(this.x.employees[0].password);

      if (!this.x.employees[0].email.length || !this.appService.validateEmail(this.x.employees[0].email)) {
        this.errorEmail = true;
        error = true;
      } else {
        this.errorEmail = false;
      }

      if (!this.x.employees[0].password.length) {
        this.errorPassword = true;
        error = true;
      } else {
        this.errorPassword = false;
      }
    }

    return !error;
  }
}
