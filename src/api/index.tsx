import axios from "axios";

import { CurrencyExchangeRate, ExchangeRate, GoldPrice } from "./models";

export const getCurrentExchangeRates = async (): Promise<[ExchangeRate]> => {
  const result = await axios.get(
    `https://api.nbp.pl/api/exchangerates/tables/a/last/?format=json`
  );
  return result?.data;
};

export const getCodeExchangeRatesForLast14Days = async (
  code: string
): Promise<CurrencyExchangeRate> => {
  const result = await axios.get(
    `https://api.nbp.pl/api/exchangerates/rates/a/${code}/last/14/?format=json`
  );
  return result?.data;
};

export const getGoldPricesForLast30Days = async (): Promise<[GoldPrice]> => {
  const result = await axios.get(
    `https://api.nbp.pl/api/cenyzlota/last/30/?format=json`
  );

  return result?.data;
};
