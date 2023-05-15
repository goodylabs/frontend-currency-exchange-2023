import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import routes from '../common/routes';
import Chart from '../components/Chart';
import api from '../services/api';
import getHistoricalDates from '../utils/getHistoricalDates';

const useCurrency = (code) => {
  const date = dayjs();
  const [startDate, endDate] = getHistoricalDates(date);

  return useQuery({
    queryKey: ['currency'],
    queryFn: async () => {
      const res = await api.get(`/exchangerates/rates/A/${code}/${startDate}/${endDate}`);
      return res.data;
    },
  });
};

const Currency = () => {
  const { code } = useParams();
  const { isLoading, error, data } = useCurrency(code);
  const rates = data?.rates.map(({ effectiveDate, mid }) => ({
    primary: dayjs(effectiveDate).toDate(),
    secondary: mid,
  }));
  const chartData = useMemo(() => (rates ? [{ data: rates }] : undefined), [rates]);

  if (isLoading) return 'Ładowanie...';

  if (error) return `Wystąpił błąd: ${error.message}`;

  return (
    <>
      <Link
        className="flex items-center gap-2 self-start rounded-2xl font-medium text-zinc-500 hover:text-indigo-500"
        to={routes.currencies}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Wszystkie waluty
      </Link>
      <span className="mt-12 text-3xl font-semibold tracking-wide text-indigo-500">
        {data.code}
      </span>
      <h1 className="mt-3 text-5xl font-semibold tracking-wide text-zinc-900 first-letter:uppercase">
        {data.currency}
      </h1>
      <div className="mt-12 w-full rounded-2xl bg-zinc-100 p-8">
        {!!chartData && (
          <Chart title="Kurs waluty w ciągu ostatnich dwóch tygodni" data={chartData} />
        )}
      </div>
    </>
  );
};

export default Currency;
