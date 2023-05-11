import { useGetExchangeRates } from "@api";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export const ExchangeRates = () => {
  const { data, isError, refetch } = useGetExchangeRates();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Currency Exchange Rate</h2>
          <p className="font-semibold text-text-light-100">
            {data && data[0].effectiveDate}
          </p>
        </div>
        <Button onClick={() => refetch()}>
          Refresh
          <ArrowPathIcon className="w-5" />
        </Button>
      </div>
      <table className="mt-3 text-left text-sm">
        <thead className="font-bold text-text-light-100">
          <tr>
            <th className="pu-4 pr-5 pt-4">Currency</th>
            <th className="pu-4 pr-5 pt-4">Code</th>
            <th className="pu-4 pr-5 pt-4">Mid</th>
          </tr>
        </thead>
        <tbody>
          {!isError && data ? (
            data[0].rates.map(({ code, currency, mid }) => (
              <tr
                className="border-b border-bg-light-200 last-of-type:border-0"
                key={currency}
              >
                <td className="py-4 pr-5 font-semibold">{currency}</td>
                <td className="py-4 pr-5">{code}</td>
                <td className="py-4">{mid}</td>
              </tr>
            ))
          ) : (
            <p className="p-6 text-center">
              Unable to load data. Wait a while and try to use the refresh
              button.
            </p>
          )}
        </tbody>
      </table>
    </Card>
  );
};
