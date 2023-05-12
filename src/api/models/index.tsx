export interface Rate {
  currency: string;
  code: string;
  mid: number;
}

export interface ExchangeRate {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
}
