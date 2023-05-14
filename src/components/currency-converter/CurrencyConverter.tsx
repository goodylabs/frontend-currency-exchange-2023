import { useGetCurrentCurrencyExchangeRate } from "@api";
import { Card } from "@components/card";
import { CurrencyCombobox } from "@components/currency-combobox";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { Currency } from "@typedefs/common";
import { currencies, useCurrencyConverter } from "@utils";
import { useState } from "react";

export const CurrencyConverter = () => {
  const [currency, setCurrency] = useState<Currency>(currencies[1]);

  const { data: currencyData } = useGetCurrentCurrencyExchangeRate(
    currency.code
  );

  const { value, valuePLN, setReversed, setValue, setValuePLN } =
    useCurrencyConverter(currencyData?.rates[0].mid);

  return (
    <Card className="h-fit gap-4" data-test="currency-converter-card">
      <h2 className="text-xl font-bold">Currency Converter</h2>
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-3">
          <input
            className="min-w-[180px] grow rounded-lg bg-bg-light-200 px-3 py-2 text-sm font-semibold"
            type="number"
            min={0}
            value={valuePLN}
            placeholder="0,00"
            onChange={(e) => {
              setReversed(false);
              setValuePLN(e.target.value);
            }}
            data-test="currency-converter-pln-input"
          />
          <CurrencyCombobox
            options={[]}
            onChange={() => undefined}
            value={{ code: "PLN", id: 0, name: "Złoty" }}
            disabled
          />
        </div>
        <div className="self-center">
          <ArrowsUpDownIcon className="w-5 text-text-light-200" />
        </div>
        <div className="flex gap-3">
          <input
            className="min-w-[180px] grow rounded-lg bg-bg-light-200 px-3 py-2 text-sm font-semibold"
            type="number"
            min={0}
            value={value}
            onChange={(e) => {
              setReversed(true);
              setValue(e.target.value);
            }}
            data-test="currency-converter-currency-input"
          />
          <CurrencyCombobox
            options={currencies}
            onChange={setCurrency}
            value={currency}
          />
        </div>
      </div>
    </Card>
  );
};
