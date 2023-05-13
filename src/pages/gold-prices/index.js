import React, { Component } from "react";

import { Line } from "react-chartjs-2";
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

import "./style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

class GoldPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gold: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://api.nbp.pl/api/cenyzlota/last/30/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          gold: json,
          isLoaded: true,
        });
      });
  }

  render() {
    var { isLoaded, gold } = this.state;

    if (isLoaded) {
      let goldDay = [];
      let goldPrice = [];

      for (let i = 0; i < gold.length; i++) {
        goldDay.push(`Day ${i + 1}`);
        goldPrice.push(gold.at(i).cena);
      }

      const data = {
        labels: goldDay,
        datasets: [
          {
            data: goldPrice,
            backgroundColor: "transparent",
            borderColor: "#FFD600ff",
            pointBorderColor: "#FFD600ff",
            pointBorderWidth: 4,
            tension: 0.3,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: false,
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      };

      return (
        <div className="gp-chart-container">
          <p className="gp-chart-title">
            <span className="gold">Gold</span> prices from last <span>30</span>{" "}
            days
          </p>
          <Line className="gp-chart" data={data} options={options}></Line>
        </div>
      );
    }
  }
}

export default GoldPrices;
