import { useQuery } from "@tanstack/react-query";
import { GoldPriceResponse } from "@typedefs/api/gold-price";
import { request } from "@utils";

export function useGetLastGoldPrices(lastDays: number) {
  return useQuery({
    queryKey: ["lastGoldPrices", lastDays],
    queryFn: () =>
      request<GoldPriceResponse>({ url: `/cenyzlota/last/${lastDays}` }),
  });
}
