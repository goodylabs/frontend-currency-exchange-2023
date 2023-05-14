import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Currency = () => {
  const { code } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['currency'],
    queryFn: async () => {
      const res = await api.get(`/exchangerates/rates/A/${code}`);
      return res.data;
    },
  });

  if (isLoading) return 'Ładowanie...';

  if (error) return 'Wystąpił błąd: ' + error.message;

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">{data.currency}</h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">XD</span>
    </>
  );
};

export default Currency;
