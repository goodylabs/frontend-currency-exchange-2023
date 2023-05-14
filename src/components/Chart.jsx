import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Chart as ReactChart } from 'react-charts';
import colors from 'tailwindcss/colors';

const Chart = ({ title, data, color = colors.indigo[500] }) => {
  const firstSeries = data[0].data;

  const minPrimary = dayjs.min(...firstSeries.map(({ primary }) => dayjs(primary))).toDate();
  const maxPrimary = dayjs.max(...firstSeries.map(({ primary }) => dayjs(primary))).toDate();

  const minSecondary = Math.min(...firstSeries.map(({ secondary }) => secondary));
  const maxSecondary = Math.max(...firstSeries.map(({ secondary }) => secondary));

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: 'localTime',
      hardMin: minPrimary,
      hardMax: maxPrimary,
    }),
    [maxPrimary, minPrimary],
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: 'area',
        hardMin: minSecondary - minSecondary * 0.0005,
        hardMax: maxSecondary + maxSecondary * 0.0005,
      },
    ],
    [minSecondary, maxSecondary],
  );

  return (
    <div className="rounded-xl bg-white pt-8 shadow-2xl shadow-zinc-900/10">
      <span className="px-8 text-lg font-medium text-zinc-900">{title}</span>
      <div className="h-[500px]">
        <ReactChart
          options={{
            padding: 32,
            defaultColors: [color],
            tooltip: false,
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
