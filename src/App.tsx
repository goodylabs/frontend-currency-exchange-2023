import { Route, Routes } from 'react-router-dom';
import { CurrencyHistoryPage } from './pages/CurrencyHistoryPage';
import { CurrencyConverterPage } from './pages/CurrencyConverter';
import { ExchangeRateTablePage } from './pages/ExchangeRateTablePage';
import { GoldPricePage } from './pages/GoldPricePage';
import '@fontsource/inter';
import '@fontsource/roboto';
import { CryptoCurrencyTablePage } from './pages/CryptoCurrencyTablePage';

export function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<CurrencyConverterPage />}
      />
      <Route
        path='/gold'
        element={<GoldPricePage />}
      />
      <Route
        path='currency-history'
        element={<CurrencyHistoryPage />}
      />
      <Route
        path='exchange'
        element={<ExchangeRateTablePage />}
      />
      <Route
        path='crypto'
        element={<CryptoCurrencyTablePage />}
      />
    </Routes>
  );
}
