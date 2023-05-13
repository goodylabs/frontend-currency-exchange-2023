import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const URL = "https://api.nbp.pl/api/cenyzlota?format=json";

const CurrencyTable = () => {
  const [Prices, setPrices] = useState([]);
  const [goldPricesChartOptions] = useState({
    chart: {
      id: 'realtime',
      easing: 'linear',
      height: 150
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    title: {
      text: 'Historical Dollar Price (last 14 days)',
      align: 'center'
    },
    xaxis: {
      type: 'datetime',

    },
    colors: ['#ffd700'],
    yaxis: {
      max: 4.25
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },

  });

  const [series, setSeries] = useState([{ data: [] }]);

  useEffect(() => {
    fetch('https://api.nbp.pl/api/exchangerates/rates/A/USD/last/14/?format=json')
      .then(response => response.json())
      .then(data => {
        const pricesArray = Object.values(data.rates).map(item => ({
          x: new Date(item.effectiveDate),
          y: item.mid
        }));
        setPrices(pricesArray);
        setSeries([{ data: pricesArray }]);
      });
  }, []);

  return (
    <>
      
      <div className="mx-60 mt-20">
      <div className="text-center text-5xl  text-white mb-1 stroke-black">Historical Dollar Price</div>
      <div className="text-white bg-white  rounded-lg">
        <Chart options={goldPricesChartOptions} series={series} height={350} type="line" />
      </div>
      </div>
    </>
  );
};

export default CurrencyTable;
