import { useGetCurrentGoldPrice, useGetLastGoldPrices } from "@api";
import { Card } from "@components/card";
import { GoldPriceListbox } from "@components/gold-price/gold-price-listbox";
import { goldPriceChartOptions, goldPriceOptions } from "@utils";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

export const GoldPrice = () => {
  const [lastDays, setLastDays] = useState(goldPriceOptions[2]);

  const { data } = useGetCurrentGoldPrice();
  const { data: lastDaysData } = useGetLastGoldPrices(lastDays.value);

  const [labels, values] = useMemo(
    () => [
      lastDaysData?.map(({ data }) => data),
      lastDaysData?.map(({ cena }) => cena),
    ],
    [lastDaysData]
  );

  const chartOptions = useMemo(() => {
    const opts = { ...goldPriceChartOptions };
    opts.plugins.title.text = `Gold price for last ${lastDays.value} days`;
    return opts;
  }, [lastDays.value]);

  return (
    <Card className="h-fit grow gap-4">
      <h2 className="text-xl font-bold">Gold Price</h2>
      <div className="flex justify-between">
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
        <GoldPriceListbox
          onChange={setLastDays}
          options={goldPriceOptions}
          value={lastDays}
        />
      </div>
      <Line
        options={chartOptions}
        data={{
          datasets: [
            {
              data: values,
              borderColor: "#1dcf4c",
              backgroundColor: "#1dcf4c",
            },
          ],
          labels,
        }}
      />
    </Card>
  );
};
