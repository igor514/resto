export class FeeDto {
  type: string;
  vat?: number;
  tax?: number;
  gateway_fee?: number;
  vat_enabled?: boolean;
  tax_enabled?: boolean;
  gateway_fee_enabled?: boolean;
}
