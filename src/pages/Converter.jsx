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

  const switchCurrencies = () => {
    const temp = leftCurrency;
    setLeftCurrency(rightCurrency);
    setRightCurrency(temp);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length === 0) setLeftValue('');
    if (isNaN(+value)) return;
    setLeftValue(value);
  };

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
      <span className="mt-12 text-xl font-semibold text-zinc-900">Instrukcja</span>
      <span className="mt-2 text-zinc-500">
        Wybierz walutę z lewej i prawej strony, a potem podaj kwotę, którą chcesz przeliczyć.
        <br />
        Możesz również zamienić waluty przyciskiem na środku.
      </span>
      <div className="mt-12 flex gap-6 self-start rounded-2xl bg-zinc-100 p-8">
        <div className="flex w-80 flex-col gap-4">
          <CurrencySelect data={data.rates} value={leftCurrency} onChange={setLeftCurrency} />
          <Input
            placeholder="Wpisz kwotę"
            disabled={!leftCurrency || !rightCurrency}
            value={leftValue}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <button
          className="flex h-14 w-14 items-center justify-center self-center rounded-full bg-white/0 text-zinc-500 transition hover:bg-indigo-500 hover:text-white"
          onClick={switchCurrencies}
        >
          <ArrowsRightLeftIcon className="h-8 w-8" />
        </button>
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
