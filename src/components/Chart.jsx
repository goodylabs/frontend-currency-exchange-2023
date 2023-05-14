import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Chart as ReactChart } from 'react-charts';
import colors from 'tailwindcss/colors';

const Chart = ({ title, data }) => {
  const minMid = Math.min(...data.rates.map(({ mid }) => mid));
  const maxMid = Math.max(...data.rates.map(({ mid }) => mid));

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.date,
      scaleType: 'localTime',
    }),
    [],
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.mid,
        elementType: 'area',
        hardMin: minMid - minMid * 0.0005,
        hardMax: maxMid + maxMid * 0.0005,
      },
    ],
    [minMid, maxMid],
  );

  const chartData = useMemo(
    () => [
      {
        data: data?.rates.map((rate) => ({
          date: dayjs(rate.effectiveDate).toDate(),
          mid: rate.mid,
        })),
      },
    ],
    [data],
  );

  return (
    <div className="rounded-xl bg-white pt-8 shadow-2xl shadow-zinc-900/10">
      <span className="px-8 text-lg font-medium text-zinc-900">{title}</span>
      <div className="h-[500px]">
        <ReactChart
          options={{
            padding: 32,
            defaultColors: [colors.indigo[500]],
            tooltip: false,
            data: chartData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
