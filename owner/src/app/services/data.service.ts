import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Lang} from '../model/orm/lang.model';
import {Words} from '../model/orm/words.type';
import {Settings} from '../model/orm/settings.type';
import {IAdminAuthData} from '../model/dto/admin.authdata.interface';
import {IGetAll} from '../model/dto/getall.interface';
import {IAnswer} from '../model/dto/answer.interface';
import {IAdminLogin} from '../model/dto/admin.login.interface';
import {IAdminUpdatePassword} from '../model/dto/admin.updatepassword.interface';
import {IGetChunk} from '../model/dto/getchunk.interface';
import {Restaurant} from '../model/orm/restaurant.model';
import {Currency} from '../model/orm/currency.model';
import {IRestaurantRecharge} from '../model/dto/restaurant.recharge.interface';
import {Transaction} from '../model/orm/transaction.model';
import {Order} from '../model/orm/order.model';
import {FacilityType} from '../model/orm/facility.type.model';
import {RequestService} from './request.service';
import {environment} from '../../environments/environment.prod';
import {IRestaurantOnboard} from "../model/dto/restaurant.onobard.dto";
import {IOnboardDto} from "../model/dto/onboard.dto";
import {IWSServer} from "../model/orm/wsserver.interface";

@Injectable()
export class DataService extends RequestService {
  protected route = '/owner';

  public wsserversAll(dto: IGetAll): Observable<IAnswer<IWSServer[]>> {
    return this.sendRequest('wsservers/all', dto);
  }

  public langsAll(dto: IGetAll): Observable<IAnswer<Lang[]>> {
    return this.sendRequest('langs/all', dto);
  }

  public wordsAll(): Observable<IAnswer<Words>> {
    return this.sendRequest('words/all');
  }

  public settingsAll(): Observable<IAnswer<Settings>> {
    return this.sendRequest('settings/all');
  }

  public adminsLogin(dto: IAdminLogin): Observable<IAnswer<IAdminAuthData>> {
    return this.sendRequest('admins/login', dto);
  }

  public adminsLoginByEmail(email: string): Observable<IAnswer<IAdminAuthData>> {
    return this.sendRequest('admins/login-by-email', {email});
  }

  public adminsUpdatePassword(dto: IAdminUpdatePassword): Observable<IAnswer<void>> {
    return this.sendRequest('admins/update-password', dto, true);
  }

  public restaurantsChunk(dto: IGetChunk): Observable<IAnswer<Restaurant[]>> {
    return this.sendRequest('restaurants/chunk', dto, true);
  }

  public restaurantsOne(id: number): Observable<IAnswer<Restaurant>> {
    return this.sendRequest(`restaurants/one/${id}`, null, true);
  }

  public restaurantsCreate(x: Restaurant): Observable<IAnswer<void>> {
    return this.sendRequest('restaurants/create', x, true);
  }

  public restaurantsUpdate(x: Restaurant): Observable<IAnswer<void>> {
    return this.sendRequest('restaurants/update', x, true);
  }

  public restaurantsDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`restaurants/delete/${id}`, null, true);
  }

  public restaurantsRecharge(dto: IRestaurantRecharge): Observable<IAnswer<void>> {
    return this.sendRequest('restaurants/recharge', dto, true);
  }

  public restaurantsOnboard(dto: IRestaurantOnboard): Observable<IAnswer<IOnboardDto>> {
    return this.sendRequest(`restaurants/onboard/${dto.restaurant_id}`, null, true);
  }

  public currenciesAll(dto: IGetAll): Observable<IAnswer<Currency[]>> {
    return this.sendRequest('currencies/all', dto, true);
  }

  public transactionsChunk(dto: IGetChunk): Observable<IAnswer<Transaction[]>> {
    return this.sendRequest('transactions/chunk', dto, true);
  }

  public ordersChunk(dto: IGetChunk): Observable<IAnswer<Order[]>> {
    return this.sendRequest('orders/chunk', dto, true);
  }

  public facilityTypesAll(dto: IGetAll): Observable<IAnswer<FacilityType[]>> {
    return this.sendRequest('facility-types/all', dto, true);
  }

}
