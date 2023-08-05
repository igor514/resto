import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestService} from './request.service';
import {IAnswer} from '../model/dto/answer.interface';
import {PaymentDto} from '../model/dto/payment.dto';
import {Observable, Subject} from 'rxjs';
import {BalanceCurrencyDto} from "../model/dto/balance.currency.dto";
import {PaymentLinkDto} from "../model/dto/payment.link.dto";
import {Recharge} from "../model/orm/recharge.model";
import {CreatePaymentLinkDto} from "../model/dto/create.payment.link.dto";
import {TransactionType} from "../model/enum/payment-type.enum";
import {RechargeType} from "../model/enum/recharge-type.enum";
import {PaymentMethod} from "../model/enum/payment-method.enum";
import {filter} from "rxjs/operators";

@Injectable()
export class PaymentsService extends RequestService {
  protected route = '/payments'
  private _balanceCurrency: BalanceCurrencyDto;
  public recharge$ = new Subject<Recharge & {amount: number}>();

  private readonly RECHARGE_KEY = "active-recharges";

  getRecharge(payment_link: string): Recharge {
    return this.recharges.find(r => r.payment_link === payment_link);
  }

  completeRecharge(payment_link: string): Recharge {
    let values = this.recharges;
    const complete = values.find(r => r.payment_link !== payment_link);
    values = values.filter(r => r.payment_link !== payment_link);
    localStorage.setItem(this.RECHARGE_KEY, JSON.stringify(values));
    return complete;
  }

  addRecharge(payment_link: string, restaurant_id: number): void {
    const values = this.recharges;
    const date = new Date();
    date.setDate(date.getDate() + 3);
    values.push({
      payment_link, restaurant_id, expires: date.toISOString()
    });
    localStorage.setItem(this.RECHARGE_KEY, JSON.stringify(values));
  }

  private get recharges(): Recharge[] {
    let values = (JSON.parse(localStorage.getItem(this.RECHARGE_KEY)) || []) as Recharge[];
    const date = new Date();
    values = values.filter(v => new Date(v.expires) > date);
    localStorage.setItem(this.RECHARGE_KEY, JSON.stringify(values));
    return values;
  }

  init(): void {
    const sub = this.authData.
      pipe(filter(data => data !== null))
      .subscribe(() => {
        this.getBalanceCurrency().subscribe(res => {
          this._balanceCurrency = res.data
          sub.unsubscribe()
      })
    });
  }

  public get balanceCurrency(): BalanceCurrencyDto {
    if (this._balanceCurrency) {
      return this._balanceCurrency;
    }

    const DEFAULT_CURR_SYMBOL = 'د.إ';
    const DEFAULT_CURR_CODE = 'AED';

    return {
      symbol: DEFAULT_CURR_SYMBOL,
      code: DEFAULT_CURR_CODE,
    };
  }

  public getBalanceCurrency(): Observable<IAnswer<BalanceCurrencyDto>> {
    return this.sendRequest('balance/currency', null, true);
  }

  public getBalanceTotal(amount: number, restaurant_id: number): Observable<IAnswer<PaymentDto>> {
    return this.sendRequest('balance/total', {amount, restaurant_id, type: PaymentMethod.Stripe}, true);
  }

  public createPaymentLink(body: Pick<CreatePaymentLinkDto, 'amount' | 'restaurant_id'>): Observable<IAnswer<PaymentLinkDto>> {
    const data: CreatePaymentLinkDto = {...body, type: TransactionType.Balance, balance_type: RechargeType.Employee};
    return this.sendRequest('link', data, true);
  }
}
