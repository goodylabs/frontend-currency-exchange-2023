import { Card } from "@components/card";
import { CurrencyCombobox } from "@components/currency-combobox";
import { TableAChart, TableBChart } from "./charts";
import { currencies } from "@utils";
import { useState } from "react";

export const HistoricalExchangeRates = () => {
  const [currency, setCurrency] = useState(currencies[1]);

  return (
    <Card className="h-fit gap-4" data-test="historical-exchange-rates-card">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-xl font-bold">Historical Exchange Rate</h2>
        <CurrencyCombobox
          onChange={setCurrency}
          value={currency}
          options={currencies}
        />
      </div>
      <TableAChart code={currency.code} />
      <TableBChart code={currency.code} />
    </Card>
  );
};
