import { Chart } from "@components/chart";
import { GoldPriceResponse } from "@typedefs/api/gold-price";
import { goldPriceChangeChartOptions } from "@utils";
import { FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";

type GoldChangeBarChartProps = {
  data?: GoldPriceResponse;
  days: number;
};

export const GoldChangeBarChart: FC<GoldChangeBarChartProps> = ({
  days,
  data,
}) => {
  const [labels, values] = useMemo(
    () => [
      data?.map(({ data }) => data).slice(1) || [],
      data
        ?.map(({ cena }, idx, arr) => {
          if (idx !== 0) return arr[idx - 1].cena - cena;
          return 0;
        })
        .slice(1) || [],
    ],
    [data]
  );

  const chartOptions = useMemo(() => {
    const opts = { ...goldPriceChangeChartOptions };
    opts.plugins.title.text = `Last ${days} gold price change quotes`;
    return opts;
  }, [days]);

  return (
    <Chart
      component={Bar}
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
