export type ExchangeRate = {
  currency: string;
  code: string;
  mid: number;
};

export type GetExchangeRatesResponse = Array<{
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
}>;
