import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent} from '@angular/common/http';

import {Lang} from '../model/orm/lang.model';
import {Words} from '../model/orm/words.type';
import {Settings} from '../model/orm/settings.type';
import {IGetAll} from '../model/dto/getall.interface';
import {IAnswer} from '../model/dto/answer.interface';
import {IGetChunk} from '../model/dto/getchunk.interface';
import {IEmployeeAuthData} from '../model/dto/employee.authdata.interface';
import {IEmployeeLogin} from '../model/dto/employee.login.interface';
import {Employee} from '../model/orm/employee.model';
import {EmployeeStatus} from '../model/orm/employee.status.model';
import {IEmployeeSetStatus} from '../model/dto/employee.setstatus.interface';
import {IEmployeeConfirm} from '../model/dto/employee.confirm.interface';
import {IEmployeeUpdatePassword} from '../model/dto/employee.updatepassword.interface';
import {Hall} from '../model/orm/hall.model';
import {Cat} from '../model/orm/cat.model';
import {Icon} from '../model/orm/icon.model';
import {Product} from '../model/orm/product.model';
import {IProductUpdatePos} from '../model/dto/product.updatepos.interface';
import {IPathable} from '../model/dto/pathable.interface';
import {Order} from '../model/orm/order.model';
import {IOrderAccept} from '../model/dto/order.accept.interface';
import {IServing} from '../model/orm/serving.interface';
import {IWSServer} from '../model/orm/wsserver.interface';
import {IGetMonthStats} from '../model/dto/stats/get.month.stats.interface';
import {ITableSum} from '../model/dto/stats/table.sum.interface';
import {IEmployeeSum} from '../model/dto/stats/employee.sum.interface';
import {IGetYearStats} from '../model/dto/stats/get.year.stats.interface';
import {Floor} from '../model/orm/floor.model';
import {RoomType} from "../model/orm/room.type.model";
import {GroupedOrders, GroupEntity} from "../model/orm/grouped.orders.model";
import {IGetGroup} from "../model/dto/group.get.interface";
import {IGroupOrders} from "../model/dto/group.orders.interface";
import {IGroupOrdersResponse} from "../model/dto/group.orders.response.interface";
import {OrderPatchDto} from "../model/dto/order.patch.dto";
import {IngredientType} from "../model/orm/ingredient.type.model";
import {Unit} from "../model/orm/unit.model";
import {RequestService} from './request.service';
import {environment} from '../../environments/environment';
import {QRModel} from "../model/orm/qr.model";


@Injectable()
export class DataService extends RequestService {
  protected route = '/restorator'

  public updateParam(obj: string, id: number, p: string, v: any): Observable<IAnswer<void>> {
    return this.sendRequest('objects/update-param', {obj, id, p, v}, true);
  }

  public filesImgUpload(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {
    return this.sendRequest(`files/img-upload`, fd, true, true);
  }

  public filesImgUploadResize(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {
    return this.sendRequest(`files/img-upload-resize`, fd, true, true);
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

  public roomTypesAll(dto: IGetAll): Observable<IAnswer<RoomType[]>> {
    return this.sendRequest('room-types/all', dto, true);
  }

  public employeesLogin(dto: IEmployeeLogin): Observable<IAnswer<IEmployeeAuthData>> {
    return this.sendRequest('employees/login', dto);
  }

  public employeesLoginByEmail(email: string): Observable<IAnswer<IEmployeeAuthData>> {
    return this.sendRequest('employees/login-by-email', {email});
  }

  public employeesCheck(id: number): Observable<IAnswer<Employee>> {
    return this.sendRequest(`employees/check/${id}`, null, true);
  }

  public employeesConfirm(dto: IEmployeeConfirm): Observable<IAnswer<void>> {
    return this.sendRequest(`employees/confirm`, dto, true);
  }

  public employeeSetStatus(dto: IEmployeeSetStatus): Observable<IAnswer<void>> {
    return this.sendRequest('employees/set-status', dto, true);
  }

  public employeesAll(dto: IGetAll): Observable<IAnswer<Employee[]>> {
    return this.sendRequest(`employees/all`, dto, true);
  }

  public employeesChunk(dto: IGetChunk): Observable<IAnswer<Employee[]>> {
    return this.sendRequest('employees/chunk', dto, true);
  }

  public employeesDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`employees/delete/${id}`, null, true);
  }

  public employeesCreate(x: Employee): Observable<IAnswer<void>> {
    return this.sendRequest('employees/create', x, true);
  }

  public employeesOne(id: number): Observable<IAnswer<Employee>> {
    return this.sendRequest(`employees/one/${id}`, null, true);
  }

  public employeesUpdate(x: Employee): Observable<IAnswer<void>> {
    return this.sendRequest('employees/update', x, true);
  }

  public employeesUpdatePassword(dto: IEmployeeUpdatePassword): Observable<IAnswer<void>> {
    return this.sendRequest('employees/update-password', dto, true);
  }

  public employeeStatusesAll(dto: IGetAll): Observable<IAnswer<EmployeeStatus[]>> {
    return this.sendRequest(`employee-statuses/all`, dto, true);
  }

  public hallsAll(dto: IGetAll): Observable<IAnswer<Hall[]>> {
    return this.sendRequest(`halls/all`, dto, true);
  }

  public hallsChunk(dto: IGetChunk): Observable<IAnswer<Hall[]>> {
    return this.sendRequest('halls/chunk', dto, true);
  }

  public hallsOne(id: number): Observable<IAnswer<Hall>> {
    return this.sendRequest(`halls/one/${id}`, null, true);
  }

  public hallsDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`halls/delete/${id}`, null, true);
  }

  public hallsCreate(x: Hall): Observable<IAnswer<void>> {
    return this.sendRequest('halls/create', x, true);
  }

  public hallsUpdate(x: Hall): Observable<IAnswer<Hall>> {
    return this.sendRequest('halls/update', x, true);
  }

  public floorsAll(dto: IGetAll): Observable<IAnswer<Floor[]>> {
    return this.sendRequest(`floors/all`, dto, true);
  }

  public floorsChunk(dto: IGetChunk): Observable<IAnswer<Floor[]>> {
    return this.sendRequest('floors/chunk', dto, true);
  }

  public floorsOne(id: number): Observable<IAnswer<Floor>> {
    return this.sendRequest(`floors/one/${id}`, null, true);
  }

  public floorsDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`floors/delete/${id}`, null, true);
  }

  public floorsCreate(x: Floor): Observable<IAnswer<void>> {
    return this.sendRequest('floors/create', x, true);
  }

  public floorsUpdate(x: Floor): Observable<IAnswer<Floor>> {
    return this.sendRequest('floors/update', x, true);
  }

  public catsAll(dto: IGetAll): Observable<IAnswer<Cat[]>> {
    return this.sendRequest(`cats/all`, dto, true);
  }

  public catsChunk(dto: IGetChunk): Observable<IAnswer<Cat[]>> {
    return this.sendRequest('cats/chunk', dto, true);
  }

  public catsOne(id: number): Observable<IAnswer<Cat>> {
    return this.sendRequest(`cats/one/${id}`, null, true);
  }

  public catsDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`cats/delete/${id}`, null, true);
  }

  public catsCreate(x: Cat): Observable<IAnswer<void>> {
    return this.sendRequest('cats/create', x, true);
  }

  public catsUpdate(x: Cat): Observable<IAnswer<void>> {
    return this.sendRequest('cats/update', x, true);
  }

  public iconsAll(dto: IGetAll): Observable<IAnswer<Icon[]>> {
    return this.sendRequest(`icons/all`, dto, true);
  }

  public productsAll(dto: IGetAll): Observable<IAnswer<Product[]>> {
    return this.sendRequest('products/all', dto, true);
  }

  public productsOne(id: number): Observable<IAnswer<Product>> {
    return this.sendRequest(`products/one/${id}`, null, true);
  }

  public productsDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`products/delete/${id}`, null, true);
  }

  public productsCreate(x: Product): Observable<IAnswer<void>> {
    return this.sendRequest('products/create', x, true);
  }

  public productsUpdate(x: Product): Observable<IAnswer<void>> {
    return this.sendRequest('products/update', x, true);
  }

  public productsUpdatePositions(dto: IProductUpdatePos[]): Observable<IAnswer<void>> {
    return this.sendRequest('products/update-positions', dto, true);
  }

  public groupOrders(dto: IGroupOrders): Observable<IAnswer<IGroupOrdersResponse>> {
    return this.sendRequest('orders/group', dto, true);
  }

  public ordersGroupsOne(dto: IGetGroup): Observable<IAnswer<GroupEntity>> {
    return this.sendRequest('orders/groups', dto, true);
  }

  public ordersGroupsAll(dto: IGetGroup): Observable<IAnswer<GroupedOrders>> {
    return this.sendRequest('orders/groups/all', dto, true);
  }

  public ordersAll(dto: IGetAll): Observable<IAnswer<Order[]>> {
    return this.sendRequest('orders/all', dto, true);
  }

  public ordersChunk(dto: IGetChunk): Observable<IAnswer<Order[]>> {
    return this.sendRequest('orders/chunk', dto, true);
  }

  public ordersAccept(dto: IOrderAccept): Observable<IAnswer<void>> {
    return this.sendRequest('orders/accept', dto, true);
  }

  public ordersOne(id: number): Observable<IAnswer<Order>> {
    return this.sendRequest(`orders/one/${id}`, null, true);
  }

  public ordersCancel(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`orders/cancel/${id}`, null, true);
  }

  public ordersComplete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`orders/complete/${id}`, null, true);
  }

  public ordersActivate(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`orders/activate/${id}`, null, true);
  }

  public ordersUpdate(x: Order): Observable<IAnswer<void>> {
    return this.sendRequest('orders/update', x, true);
  }

  public ordersPatch(x: OrderPatchDto): Observable<IAnswer<void>> {
    return this.sendRequest('orders/group/patch', x, true);
  }

  public unitsAll(dto: IGetAll): Observable<IAnswer<Unit[]>> {
    return this.sendRequest('units/all', dto, true);
  }

  public unitsChunk(dto: IGetChunk): Observable<IAnswer<Unit[]>> {
    return this.sendRequest('units/chunk', dto, true);
  }

  public unitsOne(id: number): Observable<IAnswer<Unit>> {
    return this.sendRequest(`units/one/${id}`, null, true);
  }

  public ingredientTypesAll(dto: IGetAll): Observable<IAnswer<IngredientType[]>> {
    return this.sendRequest('ingredient-types/all', dto, true);
  }

  public ingredientTypesChunk(dto: IGetChunk): Observable<IAnswer<IngredientType[]>> {
    return this.sendRequest('ingredient-types/chunk', dto, true);
  }

  public ingredientTypesOne(id: number): Observable<IAnswer<IngredientType>> {
    return this.sendRequest(`ingredient-types/one/${id}`, null, true);
  }

  public ingredientTypesDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`ingredient-types/delete/${id}`, null, true);
  }

  public ingredientTypesCreate(x: IngredientType): Observable<IAnswer<void>> {
    return this.sendRequest('ingredient-types/create', x, true);
  }

  public ingredientTypesUpdate(x: IngredientType): Observable<IAnswer<void>> {
    const {id, name, unit_id, price, ...rest} = x
    return this.sendRequest('ingredient-types/update', {id, name, unit_id, price}, true);
  }

  public ordersCreate(x: Order): Observable<IAnswer<void>> {
    return this.sendRequest('orders/create', x, true);
  }

  public getQR(restaurant_id: number): Observable<IAnswer<QRModel>> {
    return this.sendRequest(`qr/get/${restaurant_id}`, null, true)
  }

  public updateQR(restaurant_id: number, fd: FormData): Observable<IAnswer<void>> {
    return this.sendRequest(`qr/update/${restaurant_id}`, fd, true)
  }

  public getQRIcon(icon_id: number): Observable<Blob> {
    return this.sendRequest(
      `qr/icon`,
      {icon_id},
      false,
      false,
      {responseType: 'blob'}
    )
  }

  public getQRMedia(restaurant_id: number): Observable<Blob> {
    return this.sendRequest(
      `qr/icon/${restaurant_id}`,
      null,
      false,
      false,
      {responseType: 'blob'}
    )
  }

  public ordersExport(dto: IGetAll): void {
    this.sendDownloadRequest('orders/export', dto, true, this.apiVersion, 'orders.xlsx');
  }

  public ordersDelete(id: number): Observable<IAnswer<void>> {
    return this.sendRequest(`orders/delete/${id}`, null, true);
  }

  public servingsAll(dto: IGetAll): Observable<IAnswer<IServing[]>> {
    return this.sendRequest('servings/all', dto, true);
  }

  public wsserversAll(dto: IGetAll): Observable<IAnswer<IWSServer[]>> {
    return this.sendRequest('wsservers/all', dto);
  }

  public statsTableSumsMonthly(dto: IGetMonthStats): Observable<IAnswer<ITableSum[]>> {
    return this.sendRequest('stats/table-sums-monthly', dto, true);
  }

  public statsEmployeeSumsMonthly(dto: IGetMonthStats): Observable<IAnswer<IEmployeeSum[]>> {
    return this.sendRequest('stats/employee-sums-monthly', dto, true);
  }

  public statsYearly(dto: IGetYearStats): Observable<IAnswer<number[]>> {
    return this.sendRequest('stats/yearly', dto, true);
  }

  public qrLink(restId: number, params: URLSearchParams): string {
    return `${this.root}/v${this.apiVersion}/restorator/qr/get-image/${restId}?${params}`;
  }
}
