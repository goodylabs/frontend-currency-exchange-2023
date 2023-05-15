import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./GoldPrice.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GoldPrice = () => {
  // State variables to store gold data
  const [goldHistoricalData, setGoldHistoricalData] = useState([]);
  const [goldCurrentPrice, setGoldCurrentPrice] = useState(0);

  // Data for the chart
  const data = {
    labels: goldHistoricalData.map((item) => item.data),
    datasets: [
      {
        label: "Gold Price",
        data: goldHistoricalData.map((item) => item.cena),
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
  }, []);

  // Fetches gold data from API
  const fetchData = async () => {
    try {
      // Fetch current gold price
      const currentPriceResponse = await fetch(
        "https://api.nbp.pl/api/cenyzlota"
      );
      const currentPrice = await currentPriceResponse.json();

      setGoldCurrentPrice(currentPrice[0]);

      // Fetch historical gold data
      const historicalDataResponse = await fetch(
        "https://api.nbp.pl/api/cenyzlota/last/10"
      );
      const historicalData = await historicalDataResponse.json();

      setGoldHistoricalData(historicalData);
    } catch (error) {
      console.error("Error fetching gold price data:", error);
    }
  };

  return (
    <>
      <div className="c-gold-price__heading">
        <h2 className="c-gold-price__header">Złoto</h2>
        <div className="c-gold-price__current">
          <span className="c-gold-price__current-result">Aktualna Cena:</span>
          <span className="c-currency__current-price">
            {goldCurrentPrice.cena ? goldCurrentPrice.cena : "???"} zł
          </span>
        </div>
      </div>

      <h3 className="c-gold-price__subheader">
        Seria ostatnich 10 notowań cen złota
      </h3>
      <div className="c-gold-price__chart">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default GoldPrice;
