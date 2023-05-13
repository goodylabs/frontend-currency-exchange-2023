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

export interface CurrencyRate {
  no: string;
  effectiveDate: string;
  mid: number;
}

export interface CurrencyExchangeRate {
  table: string;
  currency: string;
  code: string;
  rates: CurrencyRate[];
}

export interface GoldPrice {
  data: string;
  cena: number;
}
