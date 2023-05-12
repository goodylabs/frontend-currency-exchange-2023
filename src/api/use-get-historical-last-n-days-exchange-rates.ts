import { useQuery } from "@tanstack/react-query";
import { GetHistoricalExchangeRatesResponse } from "@typedefs/api/historical-exchange-rates";
import { request } from "@utils";
import dayjs from "dayjs";

export function useGetHistoricalLastDaysExchangeRates(
  lastDays: number,
  currencyCode: string
) {
  const endDate = dayjs();
  const startDate = endDate.subtract(lastDays, "days");

  return useQuery({
    queryKey: ["historicalExchangeRates", lastDays, currencyCode],
    queryFn: () =>
      request<GetHistoricalExchangeRatesResponse>({
        url: `/exchangerates/rates/C/${currencyCode}/${startDate.format(
          "YYYY-MM-DD"
        )}/${endDate.format("YYYY-MM-DD")}/`,
      }),
  });
}
