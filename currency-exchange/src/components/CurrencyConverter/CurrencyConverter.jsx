import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  // State variables
  const [currencies, setCurrencies] = useState([]); // Array of currencies
  const [baseCurrency, setBaseCurrency] = useState(""); // Selected base currency
  const [targetCurrency, setTargetCurrency] = useState(""); // Selected target currency
  const [amount, setAmount] = useState(0); // Amount to convert
  const [convertedAmount, setConvertedAmount] = useState(0); // Converted amount
  const [showResult, setShowResult] = useState(false); // Flag to display conversion result

  // Fetch currencies from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nbp.pl/api/exchangerates/tables/A?format=json"
        );
        const data = await response.json();
        setCurrencies(data[0].rates);
        setBaseCurrency(data[0].rates[0].code);
        setTargetCurrency(data[0].rates[1].code);
      } catch (error) {
        console.log("Wystąpił błąd podczas pobierania danych walut:", error);
      }
    };

    fetchData();
  }, []);

  // Event handler for base currency change
  const handleBaseCurrencyChange = (selectedOption) => {
    setBaseCurrency(selectedOption.value);
    setShowResult(false);
  };

  // Event handler for target currency change
  const handleTargetCurrencyChange = (selectedOption) => {
    setTargetCurrency(selectedOption.value);
    setShowResult(false);
  };

  // Event handler for amount change
  const handleAmountChange = (event) => {
    setAmount(parseInt(event.target.value));
    setShowResult(false);
  };

  // Perform currency conversion
  const handleConvert = async () => {
    try {
      // Fetch base currency exchange rate
      const baseCurrencyResponse = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${baseCurrency}/?format=json`
      );
      const baseCurrencyData = await baseCurrencyResponse.json();
      const baseExchangeRate = baseCurrencyData.rates[0].mid;

      // Fetch target currency exchange rate
      const targetCurrencyResponse = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${targetCurrency}/?format=json`
      );
      const targetCurrencyData = await targetCurrencyResponse.json();
      const targetExchangeRate = targetCurrencyData.rates[0].mid;

      // Perform conversion
      const converted = (
        (amount * baseExchangeRate) /
        targetExchangeRate
      ).toFixed(2);
      setConvertedAmount(converted);
      setShowResult(true);
    } catch (error) {
      console.log("Wystąpił błąd podczas pobierania kursu waluty:", error);
    }
  };

  // Event handler for exchanging base and target currencies
  const handleExchangeClick = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
    setShowResult(false);
  };

  // Create options for select elements
  const selectOptions = currencies.map((currency) => ({
    value: currency.code,
    label: currency.currency,
  }));

  return (
    <>
      <h2 className="c-currency__header">Kalkulator Walutowy</h2>
      <div className="c-currency__content">
        <div className="c-currency__select-container">
          <div className="c-currency__select-label">
            <label className="c-currency__label">Waluta bazowa:</label>
            <Select
              className="c-currency__select"
              value={{ value: baseCurrency, label: baseCurrency }}
              options={selectOptions}
              onChange={handleBaseCurrencyChange}
            />
          </div>
          <span
            className="c-currency__exchange-icon"
            onClick={handleExchangeClick}
          >
            ⇄
          </span>
          <div className="c-currency__select-label">
            <label className="c-currency__label">Waluta docelowa:</label>
            <Select
              className="c-currency__select"
              value={{ value: targetCurrency, label: targetCurrency }}
              options={selectOptions}
              onChange={handleTargetCurrencyChange}
            />
          </div>
        </div>
        <div className="c-currency__price">
          <label className="c-currency__label">Kwota:</label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Wprowadź kwotę"
            style={{
              width: "100px",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #ccc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "16px",
              outline: "none",
              transition: "box-shadow 0.3s",
            }}
          />
        </div>
        <button className="c-currency__button" onClick={handleConvert}>
          Przelicz
        </button>
        {showResult && (
          <span className="c-currency__result">
            {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
          </span>
        )}
      </div>
    </>
  );
};

export default CurrencyConverter;
