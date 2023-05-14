import { useGetHistoricalExchangeRates } from "@api";
import { Chart } from "@components/chart";
import { historicalExchangePricesChartOptions } from "@utils";
import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";

type TableAChartProps = {
  code: string;
};

export const TableAChart: FC<TableAChartProps> = ({ code }) => {
  const { data: exchangeRatesDataTableA } = useGetHistoricalExchangeRates(
    14,
    code,
    "A"
  );

  const [labels, midValues] = useMemo(
    () => [
      exchangeRatesDataTableA?.rates?.map(
        ({ effectiveDate }) => effectiveDate
      ) || [],
      exchangeRatesDataTableA?.rates?.map(({ mid }) => mid) || [],
    ],
    [exchangeRatesDataTableA]
  );

  return (
    <Chart
      component={Line}
      options={historicalExchangePricesChartOptions}
      data={{
        datasets: [
          {
            data: midValues,
            borderColor: "#1d5bcf",
            backgroundColor: "#1d5bcf",
            label: "MID",
          },
        ],
        labels,
      }}
    />
  );
};
