import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {loadStripe} from "@stripe/stripe-js/pure";
import {Stripe} from "@stripe/stripe-js";
import {Observable} from "rxjs";
import {IAnswer} from "../model/dto/answer.interface";
import {IntentDto} from "../model/dto/intent.dto";
import {PaymentDto} from "../model/dto/payment.dto";
import {IntentStatusDto} from "../model/dto/intent.status.dto";

enum PaymentTypes {
  Stripe = 'stripe'
}
@Injectable()
export class PaymentService extends RequestService {
  protected route = '/payments/';
  public stripe: Stripe;
  constructor(protected http: HttpClient) {
    super(http);
  }

  async initStripe(): Promise<void> {
    this.stripe = await loadStripe(environment.stripe_pub_key);
  }

  public getPaymentTypes(): Observable<IAnswer<string[]>> {
    return this.sendRequest('types');
  }
  public getTotal(amount: number, restaurant_id: number): Observable<IAnswer<PaymentDto>> {
    return this.sendRequest('order/total', {amount, restaurant_id, type: PaymentTypes.Stripe});
  }
  public createIntent(amount: number, order_id: number): Observable<IAnswer<IntentDto>> {
    return this.sendRequest('intent', {amount, order_id});
  }
  public submitIntent(intent_token: string): Observable<IAnswer<IntentStatusDto>> {
    return this.sendRequest('intent/submit', {intent_id: intent_token});
  }
}
