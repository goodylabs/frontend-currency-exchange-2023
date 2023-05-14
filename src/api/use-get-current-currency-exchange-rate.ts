import { useQuery } from "@tanstack/react-query";
import { GetCurrentCurrencyExchangeRateResponse } from "@typedefs/api/current-currency-exchange-rate";
import { apiUrls, request } from "@utils";

export function useGetCurrentCurrencyExchangeRate(currencyCode: string) {
  return useQuery({
    queryKey: ["currentCurrencyExchangeRate", currencyCode],
    queryFn: () =>
      request<GetCurrentCurrencyExchangeRateResponse>({
        url: `${apiUrls.getCurrentCurrencyExchangeRate}/${currencyCode}`,
        method: "GET",
      }),
  });
}
