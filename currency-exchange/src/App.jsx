import React, { useState } from "react";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import GoldPrice from "./components/GoldPrice/GoldPrice";
import HistoricalChart from "./components/HistoricalChart/HistoricalChart";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";

import "./App.css";

function App() {
  return (
    <div className="c-main">
      <div className="c-main__left">
        <div className="c-main__left-top">
          <CurrencyConverter />
        </div>
        <div className="c-main__left-bottom">
          <div className="c-main__left-bottom-left">
            <GoldPrice />
          </div>
          <div className="c-main__left-bottom-right">
            <HistoricalChart />
          </div>
        </div>
      </div>
      <div className="c-main__right">
        <CurrencyTable />
      </div>
    </div>
  );
}

export default App;
