import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import colors from 'tailwindcss/colors';
import Chart from '../components/Chart';
import api from '../services/api';
import getHistoricalDates from '../utils/getHistoricalDates';
import priceFormatter from '../utils/priceFormatter';

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

  const rates = historicalData?.map(({ data, cena }) => ({
    primary: dayjs(data).toDate(),
    secondary: cena,
  }));

  const chartData = useMemo(() => (rates ? [{ data: rates }] : undefined), [rates]);

  if (isCurrentLoading || isHistoricalLoading) return 'Ładowanie...';

  if (currentError || historicalError) return 'Wystąpił błąd.';

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Złoto</h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">Aktualna cena złota</span>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-yellow-500">
        {priceFormatter.format(currentData.cena)}
      </h2>
      <div className="mt-12 rounded-2xl bg-zinc-100 p-8">
        {!!chartData && (
          <Chart
            title="Kurs złota w ciągu ostatnich dwóch tygodni"
            data={chartData}
            color={colors.yellow[500]}
          />
        )}
      </div>
    </>
  );
};

export default Gold;
