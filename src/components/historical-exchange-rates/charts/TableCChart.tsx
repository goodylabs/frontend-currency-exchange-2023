import { useGetHistoricalExchangeRates } from "@api";
import { Chart } from "@components/chart";
import { historicalExchangePricesChartOptions } from "@utils";
import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";

type TableBChartProps = {
  code: string;
};

export const TableBChart: FC<TableBChartProps> = ({ code }) => {
  const { data: exchangeRatesDataTableC } = useGetHistoricalExchangeRates(
    14,
    code,
    "C"
  );

  const [labels, askValues, bidValues] = useMemo(
    () => [
      exchangeRatesDataTableC?.rates?.map(
        ({ effectiveDate }) => effectiveDate
      ) || [],
      exchangeRatesDataTableC?.rates?.map(({ ask }) => ask) || [],
      exchangeRatesDataTableC?.rates?.map(({ bid }) => bid) || [],
    ],
    [exchangeRatesDataTableC]
  );

  return (
    <Chart
      component={Line}
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
  );
};
