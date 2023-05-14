import { Chart } from "@components/chart";
import { GoldPriceResponse } from "@typedefs/api/gold-price";
import { goldPriceChartOptions } from "@utils";
import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";

type GoldLineChartProps = {
  data?: GoldPriceResponse;
  days: number;
};

export const GoldLineChart: FC<GoldLineChartProps> = ({ data, days }) => {
  const [labels, values] = useMemo(
    () => [
      data?.map(({ data }) => data) || [],
      data?.map(({ cena }) => cena) || [],
    ],
    [data]
  );

  const chartOptions = useMemo(() => {
    const opts = { ...goldPriceChartOptions };
    opts.plugins.title.text = `Last ${days} gold price quotes`;
    return opts;
  }, [days]);

  return (
    <Chart
      component={Line}
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
  );
};
