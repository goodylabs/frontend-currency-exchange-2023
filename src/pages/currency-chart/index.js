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

class CurrencyChart extends Component {
  lastCurrency = "PLN";

  constructor(props) {
    super(props);
    this.state = {
      Currency: [],
      isLoaded: false,
    };
  }

  updateCurrency() {
    if (this.props.currency !== undefined && this.props.currency !== "PLN") {
      fetch(
        `http://api.nbp.pl/api/exchangerates/rates/A/${this.props.currency}/last/14`
      )
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            Currency: json,
            isLoaded: true,
          });
        });
    }
  }

  render() {
    var { isLoaded, Currency } = this.state;

    if (this.lastCurrency !== this.props.currency) {
      this.updateCurrency();
      this.lastCurrency = this.props.currency;
    }

    if (isLoaded || this.props.currency === "PLN") {
      const curCurrency = Currency.rates;

      let curCurrencyDay = [];
      let curCurrencyValue = [];

      if (this.props.currency !== "PLN") {
        for (let i = 0; i < curCurrency.length; i++) {
          curCurrencyDay.push(`Day ${i + 1}`);
          curCurrencyValue.push(curCurrency.at(i).mid);
        }
      } else {
        for (let i = 0; i < 14; i++) {
          curCurrencyDay.push(`Day ${i + 1}`);
          curCurrencyValue.push(1);
        }
      }

      const data = {
        labels: curCurrencyDay,
        datasets: [
          {
            data: curCurrencyValue,
            backgroundColor: "transparent",
            borderColor: "#7E89FDff",
            pointBorderColor: "#7E89FDff",
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
              stepSize: 0.01,
            },
          },
        },
      };

      return (
        <div className="cc-chart-container">
          <p className="cc-chart-title">
            <span>{this.props.currency}</span> prices from last <span>14</span>{" "}
            days
          </p>

          <Line className="cc-chart" data={data} options={options}></Line>
        </div>
      );
    }
  }
}

export default CurrencyChart;
