import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {DataService} from './data.service';
import {IAdminAuthData} from '../model/dto/admin.authdata.interface';
import {Observable, Subject} from 'rxjs';
import {PaymentDto} from '../model/dto/payment.dto';
import {IAnswer} from '../model/dto/answer.interface';
import {BalanceCurrencyDto} from "../model/dto/balance.currency.dto";
import {CreatePaymentLinkDto} from "../model/dto/create.payment.link.dto";
import {PaymentLinkDto} from "../model/dto/payment.link.dto";
import {TransactionType} from "../model/orm/transaction.model";
import {Recharge} from "../model/orm/recharge.model";

enum PaymentTypes {
  Stripe = 'stripe'
}

const TRANSACTION_TYPE = 'balance';
const BALANCE_TYPE = TransactionType.Admin;

@Injectable()
export class PaymentService extends RequestService {
  protected route = '/payments';
  private _balanceCurrency: BalanceCurrencyDto;
  public recharge$ = new Subject<Recharge & {amount: number}>();

  constructor(
    protected http: HttpClient,
    protected errorService: ErrorService,
    protected dataService: DataService,
  ) {
    super(http, errorService);
  }

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

  initBalanceCurr(): void {
    if (this.authData?.token) {
      this.getBalanceCurrency().subscribe((response) => {
        this.balanceCurrency = response.data;
      });
    }
  }

  public submitIban(account_number: string, restaurant_id: number): Observable<IAnswer<void>> {
    return this.sendRequest('external_account', {account_number, restaurant_id}, true);
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

  public set balanceCurrency(data: BalanceCurrencyDto) {
    this._balanceCurrency = data;
  }

  public get authData(): IAdminAuthData {
    return this.dataService.authData;
  }

  public getBalanceCurrency(): Observable<IAnswer<BalanceCurrencyDto>> {
    return this.sendRequest('balance/currency', null, true);
  }

  public getPaymentTypes(): Observable<IAnswer<string[]>> {
    return this.sendRequest('types', null, true);
  }

  public getBalanceTotal(amount: number, restaurant_id: number): Observable<IAnswer<PaymentDto>> {
    return this.sendRequest('balance/total', {amount, restaurant_id, type: PaymentTypes.Stripe}, true);
  }

  public createPaymentLink(body: Pick<CreatePaymentLinkDto, 'amount' | 'restaurant_id'>): Observable<IAnswer<PaymentLinkDto>> {
    const data: CreatePaymentLinkDto = {...body, type: TRANSACTION_TYPE, balance_type: BALANCE_TYPE};
    return this.sendRequest('link', data, true);
  }
}
