import { createContext } from "react";

export type CurrencyDayData = {
  no: string;
  effectiveDate: string;
  mid: number;
};

export type Currency = {
  currency: string;
  code: string;
  mid: string;
};

export interface CurrencyContextInterface {
  currencyData: Currency[] | null;
  currencyTableDate: string;
  currencyGetError: boolean;
  isCurrencyDataLoading: boolean;
}

export const CurrencyContext = createContext<CurrencyContextInterface>(
  {} as CurrencyContextInterface
);
