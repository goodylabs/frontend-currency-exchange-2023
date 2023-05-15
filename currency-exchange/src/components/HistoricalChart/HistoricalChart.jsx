import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import "./HistoricalChart.css";

const HistoricalChart = () => {
  // State variables to store currency data
  const [currencyData, setCurrencyData] = useState([]);
  const [code, setCode] = useState("USD");

  // Array of currency options
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "THB", label: "THB" },
    { value: "AUD", label: "AUD" },
    { value: "HKD", label: "HKD" },
    { value: "CAD", label: "CAD" },
    { value: "NZD", label: "NZD" },
    { value: "SGD", label: "SGD" },
    { value: "EUR", label: "EUR" },
    { value: "HUF", label: "HUF" },
    { value: "CHF", label: "CHF" },
    { value: "UAH", label: "UAH" },
    { value: "JPY", label: "JPY" },
    { value: "CZK", label: "CZK" },
    { value: "DKK", label: "DKK" },
    { value: "ISK", label: "ISK" },
    { value: "NOK", label: "NOK" },
    { value: "SEK", label: "SEK" },
    { value: "RON", label: "RON" },
    { value: "BGN", label: "BGN" },
    { value: "TRY", label: "TRY" },
    { value: "ILS", label: "ILS" },
    { value: "CLP", label: "CLP" },
    { value: "PHP", label: "PHP" },
    { value: "MXN", label: "MXN" },
    { value: "ZAR", label: "ZAR" },
    { value: "BRL", label: "BRL" },
    { value: "MYR", label: "MYR" },
    { value: "IDR", label: "IDR" },
    { value: "INR", label: "INR" },
    { value: "KRW", label: "KRW" },
    { value: "CNY", label: "CNY" },
    { value: "XDR", label: "XDR" },
  ];

  // Data for the chart
  const data = {
    labels: currencyData.map((item) => item.effectiveDate),
    datasets: [
      {
        label: `${code.toUpperCase()} Price`,
        data: currencyData.map((item) => item.mid),
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      y: {
        ticks: {
          color: "black",
        },
      },
      x: {
        ticks: {
          color: "black",
        },
      },
    },
  };

  useEffect(() => {
    fetchData();
  }, [code]);

  // Fetches currency data from API
  const fetchData = async () => {
    const startDate = formatDate(getStartDate());
    const endDate = formatDate(new Date());

    const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/A/${code}/${startDate}/${endDate}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCurrencyData(data.rates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Formats the date to YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calculates the start date for fetching data (14 days ago)
  const getStartDate = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);
    return startDate;
  };

  // Event handler for currency code selection change
  const handleCodeChange = (selectedOption) => {
    setCode(selectedOption.value);
  };

  return (
    <>
      <div className="c-historical-chart__heading">
        <h2 className="c-historical-chart__header">
          Historyczne kursy wymiany walut
        </h2>
        <div className="c-historical-chart__current">
          <h3 className="c-historical-chart__subheader">Wybierz walutę:</h3>
          <Select
            className="c-historical-chart__select"
            value={currencyOptions.find((option) => option.value === code)}
            options={currencyOptions}
            onChange={handleCodeChange}
          />
        </div>
      </div>

      <div className="c-historical-chart__chart">
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};

export default HistoricalChart;
