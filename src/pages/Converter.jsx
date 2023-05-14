import { useState } from 'react';
import CurrencySelect from '../components/CurrencySelect';
import Input from '../components/Input';
import useCurrencies from '../hooks/useCurrencies';

const Converter = () => {
  const { isLoading, error, data } = useCurrencies();
  const [leftCurrency, setLeftCurrency] = useState('');
  const [rightCurrency, setRightCurrency] = useState('');

  if (isLoading) return 'Ładowanie...';

  if (error) return `Wystąpił błąd: ${error.message}`;

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Konwerter</h1>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-indigo-500"></h2>
      <div className="mt-12 flex gap-8 rounded-2xl bg-zinc-100 p-8">
        <div className="flex grow flex-col gap-2">
          <CurrencySelect data={data.rates} value={leftCurrency} onChange={setLeftCurrency} />
          <Input placeholder="Wpisz kwotę" />
        </div>
        <div className="flex grow flex-col gap-2">
          <CurrencySelect data={data.rates} value={rightCurrency} onChange={setRightCurrency} />
          <Input placeholder="Wpisz kwotę" />
        </div>
      </div>
    </>
  );
};

export default Converter;
