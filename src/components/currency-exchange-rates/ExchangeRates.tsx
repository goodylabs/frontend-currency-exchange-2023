import { useGetExchangeRates } from "@api";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export const CurrencyExchangeRates = () => {
  const { data, isError, refetch, isLoading, isSuccess } =
    useGetExchangeRates();

  return (
    <Card className="h-fit" data-test="exchange-rates-card">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Currency Exchange Rate</h2>
          {isSuccess && (
            <p className="font-semibold text-text-light-100">
              as of {data[0].effectiveDate}
            </p>
          )}
        </div>
        <Button onClick={() => refetch()} disabled={isLoading}>
          Refresh
          <ArrowPathIcon className="w-5" />
        </Button>
      </div>
      <table
        className="mt-3 text-left text-sm"
        data-test="avg-exchange-rates-table"
      >
        <thead className="font-bold text-text-light-100">
          <tr>
            <th className="pu-4 pr-5 pt-4">Currency</th>
            <th className="pu-4 pr-5 pt-4">Code</th>
            <th className="pu-4 pr-5 pt-4">Mid</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data[0].rates.map(({ code, currency, mid }) => (
              <tr
                className="border-b border-bg-light-200 last-of-type:border-0"
                key={currency}
              >
                <td className="py-4 pr-5 font-semibold">{currency}</td>
                <td className="py-4 pr-5">{code}</td>
                <td className="py-4">{mid.toFixed(5)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading && (
        <p className="w-full p-6 text-center" data-test="loading-message">
          Loading data...
        </p>
      )}
      {isError && (
        <p className="w-full p-6 text-center" data-test="error-message">
          Unable to load data. Wait a while and try to use the refresh button.
        </p>
      )}
    </Card>
  );
};
