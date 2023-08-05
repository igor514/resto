export class RestaurantFeeConfig {
  restaurant_id: number;
  payment_type: string;

  vat_balance: number;
  tax_balance: number;
  gateway_fee_balance: number;

  vat_balance_disabled: boolean;
  tax_balance_disabled: boolean;
  gateway_fee_balance_disabled: boolean;

  public build(o: Object): RestaurantFeeConfig {
    for(const field in o) {
      this[field] = o[field];
    }
    return this;
  }

  public init(paymentType: string): RestaurantFeeConfig {
    this.payment_type = paymentType;
    this.vat_balance_disabled = false;
    this.tax_balance_disabled = false;
    this.gateway_fee_balance_disabled = false;
    this.vat_balance = 0;
    this.tax_balance = 0;
    this.gateway_fee_balance = 0;
    return this
  }
}
