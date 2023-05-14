import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Chart } from 'react-charts';
import { useParams } from 'react-router-dom';
import colors from 'tailwindcss/colors';
import api from '../services/api';
import getHistoricalDates from '../utils/getHistoricalDates';

const Currency = () => {
  const { code } = useParams();
  const date = dayjs();
  const [startDate, endDate] = getHistoricalDates(date);
  const { isLoading, error, data } = useQuery({
    queryKey: ['currency'],
    queryFn: async () => {
      const res = await api.get(`/exchangerates/rates/A/${code}/${startDate}/${endDate}`);
      return res.data;
    },
  });

  const minMid = data ? Math.min(...data.rates.map(({ mid }) => mid)) : undefined;
  const maxMid = data ? Math.max(...data.rates.map(({ mid }) => mid)) : undefined;

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

  if (isLoading) return 'Ładowanie...';

  if (error) return 'Wystąpił błąd: ' + error.message;

  return (
    <>
      <span className="text-3xl font-semibold tracking-wide text-indigo-500">{data.code}</span>
      <h1 className="mt-3 text-5xl font-semibold tracking-wide text-zinc-900 first-letter:uppercase">
        {data.currency}
      </h1>
      <div className="mt-12 w-full rounded-2xl bg-zinc-100 p-8">
        <div className="rounded-xl bg-white pt-8 shadow-2xl shadow-zinc-900/10">
          <span className="px-8 text-lg font-medium text-zinc-900">
            Kurs waluty w ciągu ostatnich dwóch tygodni
          </span>
          <div className="h-[500px]">
            <Chart
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
      </div>
    </>
  );
};

export default Currency;
