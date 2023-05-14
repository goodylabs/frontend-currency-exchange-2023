import { Card } from "@components/card";
import { CurrencyCombobox } from "@components/currency-combobox";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { Currency } from "@typedefs/common";
import { currencies } from "@utils";
import { useEffect, useState } from "react";

export const CurrencyConverter = () => {
  const [currency, setCurrency] = useState<Currency>(currencies[1]);

  const [valuePLN, setValuePLN] = useState<string>("");
  const [value, setValue] = useState<string>("0");
  const [reversed, setReversed] = useState(false);

  const mid = 4.21;

  useEffect(() => {
    if (!reversed) setValue((Number(valuePLN) / mid).toFixed(2));
  }, [valuePLN, reversed]);

  useEffect(() => {
    if (reversed) setValuePLN((Number(value) * mid).toFixed(2));
  }, [value, reversed]);

  return (
    <Card className="h-fit gap-4">
      <h2 className="text-xl font-bold">Currency Converter</h2>
      <p></p>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <input
            className="rounded-lg bg-bg-light-200 px-3 py-2 text-sm font-semibold"
            type="number"
            min={0}
            value={valuePLN}
            placeholder="0.00"
            onChange={(e) => {
              if (reversed) setReversed(false);
              setValuePLN(e.target.value);
            }}
          />
          <CurrencyCombobox
            options={[]}
            onChange={() => undefined}
            value={{ code: "PLN", id: 0, name: "Złoty" }}
            disabled
          />
        </div>
        <div className="self-center">
          <ArrowsUpDownIcon className="w-5" />
        </div>
        <div className="flex gap-3">
          <input
            className="rounded-lg bg-bg-light-200 px-3 py-2 text-sm font-semibold"
            type="number"
            min={0}
            value={value}
            onChange={(e) => {
              if (!reversed) setReversed(true);
              setValue(e.target.value);
            }}
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
