import { ExchangeRates } from "@components/exchange-rates";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen w-screen flex-col gap-9 bg-body-light px-6 py-8 text-text-light-900">
        <h1 className="text-4xl font-bold">Front-End Currency Exchange 2023</h1>
        <ExchangeRates />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
