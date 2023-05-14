import React, { Component } from 'react';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import { createRoot } from 'react-dom/client';
import StatisticsTable from './StatisticsTable';

Chart.register(...registerables);

class CurrencyChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      comparison: null,
      currentPrice: null,
      currentDate: null
    };
  }

  async componentDidMount() {
    this.createChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currencyCode !== this.props.currencyCode) {
      this.createChart();
    }
  }

  async createChart() {
    const { currencyCode } = this.props;
    try {
      const endDate = moment().format('YYYY-MM-DD');
      const startDate = moment().subtract(14, 'days').format('YYYY-MM-DD');
      const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/${startDate}/${endDate}/?format=json`);
      const data = await response.json();
      const rates = data.rates;
      const dates = rates.map(rate => moment(rate.effectiveDate).format('DD.MM.YYYY'));
      const prices = rates.map(rate => rate.mid);
      
      const currentPrice = prices[prices.length - 1];
      const p2 = prices[prices.length-2];
      const comparison = currentPrice > p2 ? '↑' : '↓'; // Comparison logic
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      const currentDate = dates[dates.length-1]
      const averagePrice = (prices.reduce((total, price) => total + price, 0) / prices.length).toFixed(2);
  
      const maxPriceIndex = prices.indexOf(maxPrice);
      const minPriceIndex = prices.indexOf(minPrice);
      const maxPriceDate = dates[maxPriceIndex];
      const minPriceDate = dates[minPriceIndex];
  
      const chartCanvas = this.chartRef.current.getContext('2d');
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
  
      this.chartInstance = new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: `Currency: ${currencyCode}`,
              data: prices,
              borderColor: '#7777ff',
              color: '#ffffff',
              fill: true,
              backgroundColor: 'rgba(130, 130, 255, 0.1)',
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: `${currencyCode}`,
              color: '#ffffff',
              font: {
                size: 0,
                weight: 'bold',
              },
            },
          },
        },
      });
      const statisticsContainer = document.getElementById('statistics-table');
      const statisticsData = {
        minPrice,
        maxPrice,
        averagePrice,
        maxPriceDate,
        minPriceDate,
      };
  
      createRoot(statisticsContainer).render(<StatisticsTable {...statisticsData} />);
      this.setState({ comparison, currentPrice, currentDate }); // Set the comparison in the state
    } catch (error) {
      console.log('Error fetching currency rates:', error);
    }
  }

  render() {
    const { comparison, currentPrice, currentDate } = this.state;
    return (
      <div className='chartContainer' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div><h1>1 {this.props.currencyCode}: {currentPrice} PLN <span style={{fontSize: '50px',  color: comparison==='↑' ? 'green' : 'red'}}> {comparison}</span></h1></div>
        <p>Publication date: {currentDate}</p>
        <div style={{ position: 'relative', width: '60vw', height: '660px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <canvas ref={this.chartRef} />
        </div>
        <div style={{ margin: 'auto', width: '60vw' }} id="statistics-table"></div>
      </div>
    );
  }
  
}

export default CurrencyChart;
