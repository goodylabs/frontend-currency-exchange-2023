import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.nbp.pl/api/exchangerates/tables/A"
        );
        const data = response.data[0].rates;
        setCurrencies(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConversion = () => {
    const fromCurrencyRate = currencies.find(
      (currency) => currency.code === fromCurrency
    ).mid;
    const toCurrencyRate = currencies.find(
      (currency) => currency.code === toCurrency
    ).mid;

    const convertedValue = (amount / fromCurrencyRate) * toCurrencyRate;
    setConvertedAmount(convertedValue.toFixed(2));
  };

  return (
    <div>
      <h2>Przelicznik walut</h2>
      <div>
        <label>
          Waluta źródłowa:
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {/* Wyświetl opcje dla walut */}
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Waluta docelowa:
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {/* Wyświetl opcje dla walut */}
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Kwota:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <button onClick={handleConversion}>Przelicz</button>
      <div>
        <p>Przeliczona kwota: {convertedAmount}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
