import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import colors from 'tailwindcss/colors';
import Chart from '../components/Chart';
import api from '../services/api';
import formatPrice from '../utils/formatPrice';
import getHistoricalDates from '../utils/getHistoricalDates';

const useCurrentGoldPrice = () => {
  return useQuery({
    queryKey: ['currentGoldPrice'],
    queryFn: async () => {
      const { data } = await api.get('/cenyzlota');
      return data[0];
    },
  });
};

const useHistoricalGoldPrice = () => {
  const date = dayjs();
  const [startDate, endDate] = getHistoricalDates(date);

  return useQuery({
    queryKey: ['historicalGoldPrice'],
    queryFn: async () => {
      const { data } = await api.get(`/cenyzlota/${startDate}/${endDate}`);
      return data;
    },
  });
};

const useTopGoldPrice = (topCount) => {
  return useQuery({
    queryKey: ['topGoldPrice'],
    queryFn: async () => {
      const { data } = await api.get(`/cenyzlota/last/${topCount}`);
      return data;
    },
  });
};

const getChartData = (items) => {
  const data = items?.map(({ data, cena }) => ({
    primary: dayjs(data).toDate(),
    secondary: cena,
  }));

  return data ? [{ data }] : undefined;
};

const Gold = () => {
  const {
    isLoading: isCurrentLoading,
    error: currentError,
    data: currentData,
  } = useCurrentGoldPrice();
  const {
    isLoading: isHistoricalLoading,
    error: historicalError,
    data: historicalData,
  } = useHistoricalGoldPrice();
  const { isLoading: isTopLoading, error: topError, data: topData } = useTopGoldPrice(50);

  const chartsData = useMemo(() => {
    const historical = getChartData(historicalData);
    const top = getChartData(topData);
    return [historical, top];
  }, [historicalData, topData]);

  if (isCurrentLoading || isHistoricalLoading || isTopLoading) return 'Ładowanie...';

  if (currentError || historicalError || topError) return 'Wystąpił błąd.';

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Złoto</h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">Aktualna cena złota</span>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-yellow-500">
        {formatPrice(currentData.cena)}
      </h2>{' '}
      <div className="mt-12 flex flex-col gap-8 rounded-2xl bg-zinc-100 p-8">
        {!!chartsData[0] && (
          <Chart
            title="Kurs złota w ciągu ostatnich dwóch tygodni"
            data={chartsData[0]}
            color={colors.yellow[500]}
          />
        )}
        {!!chartsData[1] && (
          <Chart
            title="Ostatnie pięćdziesiąt notowań cen złota"
            data={chartsData[1]}
            color={colors.yellow[500]}
          />
        )}
      </div>
    </>
  );
};

export default Gold;
