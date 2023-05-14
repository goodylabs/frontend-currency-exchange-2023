import { useQuery } from "@tanstack/react-query";
import { GetExchangeRatesResponse } from "@typedefs/api/exchange-rates";
import { apiUrls, request } from "@utils";

export function useGetExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: () =>
      request<GetExchangeRatesResponse>({
        url: apiUrls.getExchangeRates,
        method: "GET",
      }),
  });
}
