export type HistoricalExchangeRate = {
  no: string;
  effectiveDate: string;
  bid: number;
  ask: number;
};

export type GetHistoricalExchangeRatesResponse = {
  table: string;
  currency: string;
  code: string;
  rates: HistoricalExchangeRate[];
};
