import {RechargeType} from "../enum/recharge-type.enum";

export class CreatePaymentLinkDto {
  restaurant_id: number;

  amount: number;

  type: string;

  balance_type: RechargeType;
}
