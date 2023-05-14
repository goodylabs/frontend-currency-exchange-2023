export type HistoricalExchangeRateTableC = {
  no: string;
  effectiveDate: string;
  bid: number;
  ask: number;
  mid: never;
};

export type HistoricalExchangeRateTableA = {
  no: string;
  effectiveDate: string;
  mid: number;
  bid: never;
  ask: never;
};

export type GetHistoricalExchangeRatesResponse<T extends "A" | "C"> = {
  table: string;
  currency: string;
  code: string;
  rates: Array<
    T extends "A" ? HistoricalExchangeRateTableA : HistoricalExchangeRateTableC
  >;
};
