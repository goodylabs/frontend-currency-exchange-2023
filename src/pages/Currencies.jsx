import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import CurrenciesTable from '../components/CurrenciesTable';
import api from '../services/api';

const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const res = await api.get('/exchangerates/tables/A');
      return res.data[0];
    },
  });
};

const Currencies = () => {
  const { isLoading, error, data } = useCurrencies();

  if (isLoading) return 'Ładowanie...';

  if (error) return 'Wystąpił błąd: ' + error.message;

  const date = dayjs(data.effectiveDate).format('DD.MM.YYYY');

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Waluty</h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">Data publikacji</span>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-indigo-500">{date}</h2>
      <div className="mt-12 rounded-2xl bg-zinc-100 p-8">
        <CurrenciesTable data={data} />
      </div>
    </>
  );
};

export default Currencies;
