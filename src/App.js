import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CurrencyTable from "./components/CurrencyTable";
import GoldPrice from "./components/GoldPrice";
import CurrencyChart from "./components/CurrencyChart";
import CurrencyConverter from "./components/CurrencyConverter";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Tabela kursów</Link>
            </li>
            <li>
              <Link to="/gold-price">Cena złota</Link>
            </li>
            <li>
              <Link to="/currency-chart">Wykres kursów</Link>
            </li>
            <li>
              <Link to="/currency-converter">Przelicznik walut</Link>
            </li>
          </ul>
        </nav>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<CurrencyTable />} />
            <Route path="/gold-price" element={<GoldPrice />} />
            <Route path="/currency-chart" element={<CurrencyChart />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
