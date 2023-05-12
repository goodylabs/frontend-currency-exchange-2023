import { useGetHistoricalLastDaysExchangeRates } from "@api";
import { Card } from "@components/card";
import { CurrencyCombobox } from "@components/currency-combobox";
import { currencies, historicalExchangePricesChartOptions } from "@utils";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

export const HistoricalExchangeRates = () => {
  const [currency, setCurrency] = useState(currencies[1]);

  const { data: exchangeRatesData } = useGetHistoricalLastDaysExchangeRates(
    14,
    currency.code
  );

  const [labels, askValues, bidValues] = useMemo(
    () => [
      exchangeRatesData?.rates?.map(({ effectiveDate }) => effectiveDate),
      exchangeRatesData?.rates?.map(({ ask }) => ask),
      exchangeRatesData?.rates?.map(({ bid }) => bid),
    ],
    [exchangeRatesData]
  );

  return (
    <Card className="h-fit gap-4">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-xl font-bold">Historical Exchange Rate</h2>
        <CurrencyCombobox
          onChange={setCurrency}
          value={currency}
          options={currencies}
        />
      </div>
      <Line
        options={historicalExchangePricesChartOptions}
        data={{
          datasets: [
            {
              data: askValues,
              borderColor: "#1dcf4c",
              backgroundColor: "#1dcf4c",
              label: "ASK",
            },
            {
              data: bidValues,
              borderColor: "#cf1d1d",
              backgroundColor: "#cf1d1d",
              label: "BID",
            },
          ],
          labels,
        }}
      />
    </Card>
  );
};
