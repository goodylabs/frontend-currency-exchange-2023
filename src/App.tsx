import { CurrencyConverter } from "@components/currency-converter";
import { CurrencyExchangeRates } from "@components/currency-exchange-rates";
import { GoldPrice } from "@components/gold-price";
import { HistoricalExchangeRates } from "@components/historical-exchange-rates";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen w-screen flex-col gap-9 px-6 py-8 text-text-light-900 lg:items-center">
        <h1 className="text-4xl font-bold lg:w-4/5">
          Front-End Currency Exchange 2023
        </h1>
        <div className="flex flex-col gap-9 lg:w-4/5 lg:flex-row">
          <CurrencyExchangeRates />
          <div className="flex h-fit w-full flex-col gap-9">
            <GoldPrice />
            <HistoricalExchangeRates />
            <CurrencyConverter />
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
