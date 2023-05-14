import { useQuery } from "@tanstack/react-query";
import { GetHistoricalExchangeRatesResponse } from "@typedefs/api/historical-exchange-rates";
import { apiUrls, request } from "@utils";
import dayjs from "dayjs";

export function useGetHistoricalExchangeRates(
  lastDays: number,
  currencyCode: string,
  table: "A" | "C"
) {
  const endDate = dayjs();
  const startDate = endDate.subtract(lastDays, "days");

  return useQuery({
    queryKey: ["historicalExchangeRates", lastDays, currencyCode, table],
    queryFn: () =>
      request<GetHistoricalExchangeRatesResponse<typeof table>>({
        url: `${
          apiUrls.getHistoricalExchangeRates
        }/${table}/${currencyCode}/${startDate.format(
          "YYYY-MM-DD"
        )}/${endDate.format("YYYY-MM-DD")}/`,
      }),
  });
}
