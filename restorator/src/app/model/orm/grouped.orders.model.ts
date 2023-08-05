import {Hall} from "./hall.model";
import {Order} from "./order.model";
import {Floor} from "./floor.model";
import {IOrderGroup} from "../dto/order.group.interface";

export class GroupEntity {
  id: number;
  no: string;
  capacity?: number;
  seats?: number
  hall?: Pick<Hall, 'name' | 'id'>
  floor?: Pick<Floor, 'number' | 'id'>

  need_waiter: boolean = false;
  need_invoice: boolean = false;
  need_products: boolean = false;

  public _highlight?: boolean = false;
  public _highlightNeedWaiter?: boolean = false;
  public _highlightNeedInvoice?: boolean = false;
  public _highlightNeedProducts?: boolean = false;

  orders: (Order & {group: IOrderGroup})[]

  init(data: Partial<GroupEntity>): GroupEntity {
    for (let field in data) {
      this[field] = data[field];
    }
    this.need_waiter = false;
    this.need_invoice = false;
    this.need_products = false;

    for (let o of this.orders) {
      if (o.need_waiter) this.need_waiter = true
      if (o.need_products) this.need_products = true
      if (o.need_invoice) this.need_invoice = true
      if (this.need_products && this.need_invoice && this.need_invoice) break
    }

    this.orders = this.orders.map(o => new Order().build(o))
    return this
  }
}

export class GroupedOrders {
  rooms: GroupEntity[]
  tables: GroupEntity[]

  init(data: Partial<GroupedOrders>): GroupedOrders {
    for (let field in data) {
      this[field] = data[field];
    }

    this.rooms = this.rooms.map(r => new GroupEntity().init(r))
    this.tables = this.tables.map(t => new GroupEntity().init(t))
    return this
  }
}
