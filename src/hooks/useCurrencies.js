import { useQuery } from '@tanstack/react-query';
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

export default useCurrencies;
