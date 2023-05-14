type CurrencyExchangeRate = {
  no: string;
  effectiveDate: string;
  mid: number;
};

export type GetCurrentCurrencyExchangeRateResponse = {
  table: string;
  currency: string;
  code: string;
  rates: CurrencyExchangeRate[];
};
