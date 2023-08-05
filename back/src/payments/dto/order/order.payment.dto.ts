import {PaymentDto} from "../payment.dto";

export class OrderPaymentDto extends PaymentDto{
    service_fee: number;
}