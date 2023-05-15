import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "./GoldPrice.css";

const GoldPrice = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        // Pobierz aktualną cenę złota
        const currentResponse = await fetch(
          "https://api.nbp.pl/api/cenyzlota/"
        );
        const currentData = await currentResponse.json();
        setCurrentPrice(currentData[0].cena);

        // Pobierz historyczne ceny złota
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 14); // Ostatnie 14 dni
        const endDate = new Date();
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const historicalResponse = await fetch(
          `https://api.nbp.pl/api/cenyzlota/${formattedStartDate}/${formattedEndDate}/`
        );
        const historicalData = await historicalResponse.json();
        setHistoricalPrices(historicalData);

        // Tworzenie wykresu dla historycznych cen złota
        createChart(historicalData);
      } catch (error) {
        console.error("Error fetching gold price:", error);
      }
    };

    fetchGoldPrice();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const createChart = (data) => {
    const labels = data.map((price) => price.data);
    const prices = data.map((price) => price.cena);

    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cena złota (PLN)",
            data: prices,
            borderColor: "gold",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Data",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Cena (PLN)",
            },
          },
        },
      },
    });
  };

  return (
    <div>
      <h2>Cena złota</h2>
      {currentPrice && <p>Aktualna cena złota: {currentPrice} PLN</p>}
      <h3>Historyczne ceny złota (ostatnie 14 dni):</h3>
      <ul>
        {historicalPrices.map((price) => (
          <li key={price.data}>
            {price.cena} PLN - {price.data}
          </li>
        ))}
      </ul>
      <div>
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default GoldPrice;
