import { useQuery } from "@tanstack/react-query";
import { GoldPriceResponse } from "@typedefs/api/gold-price";
import { apiUrls, request } from "@utils";

export function useGetCurrentGoldPrice() {
  return useQuery({
    queryKey: ["currentGoldPrice"],
    queryFn: () =>
      request<GoldPriceResponse>({
        url: apiUrls.getCurrentGoldPrice,
        method: "GET",
      }),
  });
}
