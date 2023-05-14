import { useGetCurrentGoldPrice, useGetLastGoldPrices } from "@api";
import { Card } from "@components/card";
import { GoldLineChart, GoldChangeBarChart } from "./charts";
import { GoldPriceListbox } from "@components/gold-price/gold-price-listbox";
import { goldPriceOptions } from "@utils";
import { useState } from "react";

export const GoldPrice = () => {
  const [lastDays, setLastDays] = useState(goldPriceOptions[2]);

  const { data } = useGetCurrentGoldPrice();
  const { data: lastDaysData } = useGetLastGoldPrices(lastDays.value);

  return (
    <Card className="h-fit gap-5" data-test="gold-price-card">
      <h2 className="text-xl font-bold">Gold Price</h2>
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex items-end gap-5 text-sm font-semibold text-text-light-100">
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-text-light-900">Current</h3>
            <p>{data && data[0].data}</p>
          </div>
          <p className="h-fit">
            <span
              className="mr-1 text-lg font-bold leading-5 text-text-light-900"
              data-test="current-gold-price"
            >
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
        <GoldLineChart days={lastDays.value} data={lastDaysData} />
        <GoldChangeBarChart days={lastDays.value} data={lastDaysData} />
      </div>
    </Card>
  );
};
