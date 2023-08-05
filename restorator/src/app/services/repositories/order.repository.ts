import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../../model/orm/order.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';
import { IChunk } from 'src/app/model/chunk.interface';
import { IOrderAccept } from 'src/app/model/dto/order.accept.interface';
import {IGetGroup} from "../../model/dto/group.get.interface";
import {GroupedOrders, GroupEntity} from "../../model/orm/grouped.orders.model";
import {IGroupOrders} from "../../model/dto/group.orders.interface";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";
import {IGroupOrdersResponse} from "../../model/dto/group.orders.response.interface";
import {OrderPatchDto} from "../../model/dto/order.patch.dto";

@Injectable()
export class OrderRepository extends Repository2 {
    constructor(protected dataService: DataService) {
        super(dataService);
        this.schema = "order";
    }

    public groupOrders(body: IGroupOrders): Promise<IGroupOrdersResponse> {
      return new Promise((resolve, reject) => {
        this.dataService.groupOrders(body)
          .subscribe(res => {
              if (res.statusCode === 200) {
                resolve(res.data);
              } else {
                reject(res.error);
              }
            },
            (err) => {
              reject(err.message)
            })
      })
    }

    public loadGroupsOne(body: IGetGroup): Promise<GroupEntity> {
      return new Promise((resolve, reject) => {
        this.dataService.ordersGroupsOne(body).subscribe(res => {
          if (res.statusCode === 200) {
            resolve(new GroupEntity().init(res.data));
          } else {
            reject(res.error);
          }
        }, err => {
          reject(err.message);
        });
      })
    }
    public loadGroupsAll(restaurant_id: number, employee_id: number): Promise<GroupedOrders> {
      return new Promise((resolve, reject) => {
        const dto: IGetGroup = {restaurant_id, employee_id};
        this.dataService.ordersGroupsAll(dto).subscribe(res => {
          if (res.statusCode === 200) {
            resolve(new GroupedOrders().init(res.data));
          } else {
            reject(res.error);
          }
        }, err => {
          reject(err.message);
        });
      });
    }

    public loadAll(sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy, sortDir, filter};
            this.dataService.ordersAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve(res.data.map(d => new Order().build(d)));
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public loadChunk(part: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<IChunk<Order>> {
        return new Promise((resolve, reject) => {
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.ordersChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    const chunk: IChunk<Order> = {data: res.data.map(d => new Order().build(d)), allLength: res.allLength, sum: res.sum};
                    resolve(chunk);
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public export(lang_id: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): void {
        const dto: IGetAll = {sortBy, sortDir, filter, lang_id};
        this.dataService.ordersExport(dto);
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public complete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersComplete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }

    public activate(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersActivate(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }

    public loadOne(id: number): Promise<Order> {
        return new Promise((resolve, reject) => this.dataService.ordersOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Order().build(res.data)) : reject(res.error), err => reject(err.message)));
    }

    public update(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersUpdate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public patch(x: OrderPatchDto): Promise<void> {
      return new Promise((resolve, reject) => this.dataService.ordersPatch(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public create(x: Order): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
    }

    public cancel(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.ordersCancel(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.data), err => reject(err.message)));
    }

    public accept(order_id: number, employee_id: number, employee_comment: string = ""): Promise<number> {
        return new Promise((resolve, reject) => {
            const dto: IOrderAccept = {order_id, employee_id, employee_comment};
            this.dataService.ordersAccept(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message));
        });
    }
}
