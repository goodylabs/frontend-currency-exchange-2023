import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
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

  if (isLoading) return 'Ładowanie...';

  if (error) return 'Wystąpił błąd: ' + error.message;

  return (
    <>
      <span className="text-3xl font-semibold tracking-wide text-indigo-500">{data.code}</span>
      <h1 className="mt-3 text-5xl font-semibold tracking-wide text-zinc-900 first-letter:uppercase">
        {data.currency}
      </h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">
        Kurs waluty w ciągu ostatnich dwóch tygodni
      </span>
    </>
  );
};

export default Currency;
