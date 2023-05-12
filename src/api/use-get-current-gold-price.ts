import { useQuery } from "@tanstack/react-query";
import { GoldPriceResponse } from "@typedefs/api/gold-price";
import { request } from "@utils";

export function useGetCurrentGoldPrice() {
  return useQuery({
    queryKey: ["currentGoldPrice"],
    queryFn: () =>
      request<GoldPriceResponse>({ url: "/cenyzlota", method: "GET" }),
  });
}
