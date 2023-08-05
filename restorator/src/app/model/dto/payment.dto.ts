export class PaymentDto {
  total: number;
  gateway_fee: number;
  tax_fee: number;
  vat_fee: number;

  init(amount: number): PaymentDto {
    this.total = amount;
    this.gateway_fee = 0;
    this.tax_fee = 0;
    this.vat_fee = 0;
    return this;
  }
}
