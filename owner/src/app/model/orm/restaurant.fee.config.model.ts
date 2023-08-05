export class RestaurantFeeConfig {
  restaurant_id: number;
  payment_type: string;

  //payments - balance
  vat_balance: number;
  tax_balance: number;
  gateway_fee_balance: number;

  // balance - flags
  vat_balance_disabled: boolean;
  tax_balance_disabled: boolean;
  gateway_fee_balance_disabled: boolean;

  // orders
  vat_order: number;
  tax_order: number;
  service_fee_order: number;
  gateway_fee_order: number;

  // orders - flags
  vat_order_disabled: boolean;
  tax_order_disabled: boolean;
  service_fee_order_disabled: boolean;
  gateway_fee_order_disabled: boolean;

  public build(o: Object): RestaurantFeeConfig {
    this.vat_order = 0;
    this.tax_order = 0;
    this.service_fee_order = 0;
    this.gateway_fee_order = 0;
    this.vat_order_disabled = false;
    this.tax_order_disabled = false;
    this.service_fee_order_disabled = false;
    this.gateway_fee_order_disabled = false;
    for(const field in o) {
        this[field] = o[field];
    }
    return this;
  }
}
