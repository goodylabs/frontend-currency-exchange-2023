import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import CurrencySelect from '../components/CurrencySelect';
import Input from '../components/Input';
import useCurrencies from '../hooks/useCurrencies';
import formatPrice from '../utils/formatPrice';

const Converter = () => {
  const { isLoading, error, data } = useCurrencies();
  const [leftCurrency, setLeftCurrency] = useState('');
  const [rightCurrency, setRightCurrency] = useState('');
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');

  useEffect(() => {
    if (leftValue === '') setRightValue('');

    if (!leftCurrency || !rightCurrency || !leftValue) return;

    const newRightValue = (leftCurrency.mid / rightCurrency.mid) * leftValue;

    setRightValue(newRightValue);
  }, [leftCurrency, leftValue, rightCurrency]);

  if (isLoading) return 'Ładowanie...';

  if (error) return `Wystąpił błąd: ${error.message}`;

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Konwerter</h1>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-indigo-500"></h2>
      <div className="mt-12 flex gap-8 self-start rounded-2xl bg-zinc-100 p-8">
        <div className="flex w-80 flex-col gap-4">
          <CurrencySelect data={data.rates} value={leftCurrency} onChange={setLeftCurrency} />
          <Input
            placeholder="Wpisz kwotę"
            disabled={!leftCurrency || !rightCurrency}
            value={leftValue}
            onChange={(e) => setLeftValue(e.target.value)}
          />
        </div>
        <ArrowsRightLeftIcon className="h-8 w-8 self-center text-zinc-500" />
        <div className="flex w-80 flex-col gap-4">
          <CurrencySelect data={data.rates} value={rightCurrency} onChange={setRightCurrency} />
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500">Kwota po przeliczeniu</span>
            <span className="text-xl font-bold text-indigo-500">
              {rightValue ? formatPrice(rightValue, rightCurrency.code) : '-'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Converter;
