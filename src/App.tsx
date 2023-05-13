import { styled } from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./App.css";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { GoldPrices } from "./components/GoldPrices";
import { ExchangeRates } from "./components/ExchangeRates";
import { Providers } from "providers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppComponent = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin: auto;
  background: ${({ theme }) => theme.palette.background.default};
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  height: fit-content;
  ${({ theme }) => theme.breakpoints.up("lg")} {
    position: sticky;
    top: 0;
  }
`;

export const App = () => {
  return (
    <Providers>
      <AppComponent>
        <Wrapper>
          <CurrencyConverter />
          <GoldPrices />
        </Wrapper>
        <ExchangeRates />
      </AppComponent>
    </Providers>
  );
};
