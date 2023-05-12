import React from "react";
import { styled } from "styled-components";

import "./App.css";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { GoldPrice } from "./components/GoldPrice";
import { ExchangeRates } from "./components/ExchangeRates";
import { Providers } from "providers";

const AppComponent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin: auto;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;
export const App = () => {
  return (
    <Providers>
      <AppComponent>
        <Wrapper>
          <CurrencyConverter />
          <GoldPrice />
        </Wrapper>
        <ExchangeRates />
      </AppComponent>
    </Providers>
  );
};
