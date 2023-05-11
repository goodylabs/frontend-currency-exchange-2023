import { useQuery } from "@tanstack/react-query";
import { GetExchangeRatesResponse } from "@typedefs/api/exchange-rates";
import { request } from "@utils";

export function useGetExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: () =>
      request<GetExchangeRatesResponse>({
        url: "exchangerates/tables/A/",
        method: "GET",
      }),
  });
}
