import React, { Component } from 'react';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import ReactDOM from 'react-dom';

import { getGoldPrices } from '../helpers/CurrenciesApi';
import StatisticsTable from './StatisticsTable';

Chart.register(...registerables);

class GoldChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      goldPrices: [],
      loading: true,
      error: null,
      comparison: null,
      currentPrice: null,
      currentDate: null
   
    };
  }

  async componentDidMount() {
    try {
      const goldPrices = await getGoldPrices();
      this.setState({ goldPrices, loading: false }, this.createChart);
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  createChart() {
    const chartCanvas = this.chartRef.current.getContext('2d');
    const { goldPrices } = this.state;

    // Filter the gold prices to keep only the last 14 records
    const recentGoldPrices = goldPrices.slice(-14);

    // Extract dates and prices from the recent gold prices data
    const dates = recentGoldPrices.map((price) => moment(price.data).format('DD-MM-YYYY'));
    const prices = recentGoldPrices.map((price) => price.cena);
    const currentPrice = prices[prices.length - 1];
    const p2 = prices[prices.length-2];
    const comparison = currentPrice > p2 ? '↑' : '↓'; // Comparison logic
    const currentDate = dates[dates.length-1]

    // Check if a Chart instance already exists and destroy it
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(chartCanvas, {
      type: 'line',
      width: '30%',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Gold Price',
            data: prices,
            borderColor: 'purple',
            backgroundColor: 'rgba(250,29,120,0.1)',
            fill: true,
          },
        ],
      },
    });

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const maxPriceIndex = prices.indexOf(maxPrice);
    const minPriceIndex = prices.indexOf(minPrice);
    const maxPriceDate = dates[maxPriceIndex];
    const minPriceDate = dates[minPriceIndex];

    const statisticsData = {
      minPrice,
      maxPrice,
      averagePrice: Math.round(averagePrice * 100) / 100,
      maxPriceDate,
      minPriceDate,
    };

    ReactDOM.render(<StatisticsTable {...statisticsData} />, document.getElementById('statistics-table'));
    this.setState({ comparison, currentPrice, currentDate }); // Set the comparison in the state
  }

  render() {
    const { goldPrices,comparison } = this.state;
    let content;

    const currentPrice = goldPrices.length > 0 ? goldPrices[goldPrices.length - 1].cena : null;
    const currentDate = goldPrices.length > 0 ? moment(goldPrices[goldPrices.length - 1].data).format('DD.MM.YYYY') : null;

    content = (
      <div style={{ textAlign: 'center' }}>
        <h1>Current gold price: {currentPrice} PLN <span style={{fontSize: '50px',  color: comparison==='↑' ? 'green' : 'red'}}> {comparison}</span></h1>
        <p style={{fontSize:'25px'}}>(per 1g with a purity of 1000)</p>
        <p>Publication date: {currentDate}</p>
        <div style={{ position: 'relative', margin: 'auto', width: '50vw' }}>
          <canvas ref={this.chartRef} />
        </div>
        <div style={{ margin: '0 auto', width: '60vw' }} id="statistics-table"></div>
</div>
);
return content;
}
}

export default GoldChart;

