import {IOrderProduct} from "../orm/order.product.interface";

export class OrderPatchDto {
  id: number;
  employee_comment?: string;
  products?: IOrderProduct[];
}
