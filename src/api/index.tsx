import axios, { isCancel, AxiosError } from "axios";
import { subDays, format } from "date-fns";

import { ExchangeRate } from "./models";

export const GetExchangeRatesForToday = async (): Promise<[ExchangeRate]> => {
  // subDays(date, amount)

  const result = await axios.get(
    "http://api.nbp.pl/api/exchangerates/tables/a/today/?format=json"
  );
  return result?.data;
};

export const GetExchangeRatesForYesterday = async (): Promise<
  [ExchangeRate]
> => {
  let yesterdayDate = format(subDays(new Date(), 1), "yyyy-MM-dd");

  const result = await axios.get(
    `http://api.nbp.pl/api/exchangerates/tables/a/${yesterdayDate}}/?format=json`
  );
  return result?.data;
};
