import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./CurrencyChart.css";

const CurrencyChart = () => {
  const chartRef = useRef(null);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get(
          `https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/last/14/?format=json`
        );
        const data = response.data.rates;
        const labels = data.map((rate) => rate.effectiveDate);
        const values = data.map((rate) => rate.mid);

        const ctx = chartRef.current.getContext("2d");

        if (chart) {
          chart.destroy();
        }

        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: `Kurs średni dla ${currencyCode}`,
                data: values,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          },
        });

        setChart(newChart);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencyData();
  }, [currencyCode]);

  const handleCurrencyChange = (e) => {
    setCurrencyCode(e.target.value);
  };

  return (
    <div>
      <h2>Kursy walut</h2>
      <select value={currencyCode} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        {/* You can add other values */}
      </select>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default CurrencyChart;
