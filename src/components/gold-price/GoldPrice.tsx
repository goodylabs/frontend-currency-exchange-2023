import { useGetCurrentGoldPrice, useGetLastGoldPrices } from "@api";
import { Card } from "@components/card";
import { GoldPriceListbox } from "@components/gold-price/gold-price-listbox";
import {
  goldPriceChangeChartOptions,
  goldPriceChartOptions,
  goldPriceOptions,
} from "@utils";
import { useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

export const GoldPrice = () => {
  const [lastDays, setLastDays] = useState(goldPriceOptions[2]);

  const { data } = useGetCurrentGoldPrice();
  const { data: lastDaysData } = useGetLastGoldPrices(lastDays.value);

  const [labels, values, diffLabels, diffValues] = useMemo(() => {
    const labelsGoldPrice = lastDaysData?.map(({ data }) => data);
    const labelsGoldPriceChange = labelsGoldPrice?.slice(1);
    return [
      labelsGoldPrice,
      lastDaysData?.map(({ cena }) => cena),
      labelsGoldPriceChange,
      lastDaysData
        ?.map(({ cena }, idx, arr) => {
          if (idx !== 0) return arr[idx - 1].cena - cena;
        })
        .slice(1),
    ];
  }, [lastDaysData]);

  const chartOptions = useMemo(() => {
    const opts = { ...goldPriceChartOptions };
    opts.plugins.title.text = `Last ${lastDays.value} gold price quotes`;
    return opts;
  }, [lastDays.value]);

  const changeChartOptions = useMemo(() => {
    const opts = { ...goldPriceChangeChartOptions };
    opts.plugins.title.text = `Last ${lastDays.value} gold price change quotes`;
    return opts;
  }, [lastDays.value]);

  return (
    <Card className="h-fit grow gap-5">
      <h2 className="text-xl font-bold">Gold Price</h2>
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex items-end gap-5 text-sm font-semibold text-text-light-100">
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-text-light-900">Current</h3>
            <p>{data && data[0].data}</p>
          </div>
          <p className="h-fit">
            <span className="mr-1 text-lg font-bold leading-5 text-text-light-900">
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
      <Bar
        options={changeChartOptions}
        data={{
          datasets: [
            {
              data: diffValues,
              borderColor: "#1dcf4c",
              backgroundColor: "#1dcf4c",
            },
          ],
          labels: diffLabels,
        }}
      />
    </Card>
  );
};
