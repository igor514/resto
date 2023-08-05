import {TransactionType} from "../orm/transaction.model";

export class CreatePaymentLinkDto {
  restaurant_id: number;

  amount: number;

  type: string;

  balance_type: TransactionType;
}
