import { useGetCurrentGoldPrice, useGetLastGoldPrices } from "@api";
import { Card } from "@components/card";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Gold Price For Last 14 Days",
    },
  },
};

export const GoldPrice = () => {
  const { data } = useGetCurrentGoldPrice();
  const { data: lastDaysData } = useGetLastGoldPrices(14);

  const [labels, values] = useMemo(
    () => [
      lastDaysData?.map(({ data }) => data),
      lastDaysData?.map(({ cena }) => cena),
    ],
    [lastDaysData]
  );

  return (
    <Card className="h-fit grow gap-3">
      <h2 className="text-xl font-bold">Gold Price</h2>
      <div className="flex items-end gap-5 text-sm font-semibold text-text-light-100">
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-text-light-900">Current</h3>
          <p>{data && data[0].data}</p>
        </div>
        <p className="h-fit">
          <span className="mr-1 text-base font-bold text-text-light-900">
            {data && data[0].cena}
          </span>
          PLN/G
        </p>
      </div>
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: values,
              borderColor: "#ff0000",
              backgroundColor: "#ff0000",
            },
          ],
          labels,
        }}
      />
    </Card>
  );
};
