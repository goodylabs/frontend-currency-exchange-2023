import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const URL = "https://api.nbp.pl/api/cenyzlota?format=json";

const CurrencyTable = () => {
    const [goldPrice, setGoldPrice] = useState(0);
    const [publishDate, setPublishDate] = useState(0);
    const [goldPricesHistory, setGoldPricesHistory] = useState([]);
    const [goldPricesHistory2, setGoldPricesHistory2] = useState([]);
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
            text: 'Historical Gold Price (last 30 days)',
            align: 'center'
          },
          xaxis: {
            type: 'datetime',
            
          },
          colors: ['#ffd700'],
          yaxis: {
            max: 290
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          
        });

        const [goldPricesChartOptions2] = useState({
            chart: {
                id: 'area-datetime',
                type: 'area',
                height: 350,
                zoom: {
                  autoScaleYaxis: true
                }
              },
              annotations: {
                yaxis: [{
                  y: 300,
                  label: {
                    show: true,
                    text: 'Support',
                    style: {
                      color: "#fff",
                      background: '#00E396'
                    }
                  }
                }],
            },
            colors: ['#ffd700'],
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              },
              title: {
                text: 'Historical Gold Price (last 90 days)',
                align: 'center'
              },
              markers: {
                size: 0,
                style: 'hollow',
              },
              xaxis: {
                type: 'datetime',
              },
               options: {
                chart: {
                  id: 'area-datetime',
                  type: 'area',
                  height: 350,
                  zoom: {
                    autoScaleYaxis: true
                  }
                },
            },
              yaxis: {
                max: 290
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
              stroke: {
                curve: 'smooth'
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  
                }
              },
              
            });

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setGoldPrice(data[0].cena)
        setPublishDate(data[0].data)
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch('https://api.nbp.pl/api/cenyzlota/last/30?format=json')
      .then(response => response.json())
      .then(data => {
        setGoldPricesHistory(data.map(item => ({
          x: new Date(item.data),
          y: item.cena
        })));
      });
  }, []);

  useEffect(() => {
    fetch('https://api.nbp.pl/api/cenyzlota/last/90?format=json')
      .then(response => response.json())
      .then(data => {
        setGoldPricesHistory2(data.map(item => ({
          x: new Date(item.data),
          y: item.cena
        })));
      });
  }, []);

  
  return (
    <>
     <div className="mx-60 mt-20 ">
      <div className="text-center text-5xl  text-white mb-1 stroke-black">Current Gold Price</div>
      <table className="w-full text-black">
      <tr className=" text-2xl bg-white h-16 max-h-16 text-center leading-16  items-center grid grid-cols-2 justify-center rounded-lg">
                  <th className="font-heading font-medium text-black">Date</th>
                  <th className="font-medium text-black">Price (PLN)</th>
        </tr>
        <tr className="w-full grid grid-cols-2 text-xl h-12 max-h-12 text-center leading-12 justify-center rounded-lg " >
                    <td className="border-2 border-back rounded-lg bg-white">{publishDate}</td>
                    <td  className="border-2 border-back rounded-lg bg-white">{goldPrice}</td>
                   
                  </tr>
      </table>
      <div className="text-center text-5xl  text-white mb-1 stroke-black my-20">Historical Gold Price (last 30 days)</div>
      <tr className=" text-2xl bg-white h-16 max-h-16 text-center leading-16  items-center grid grid-cols-2 justify-center rounded-lg">
                  <th className="font-heading font-medium text-black">Date</th>
                  <th className="font-medium text-black">Price (PLN)</th>
        </tr>
      {goldPricesHistory.map((gold) => (
                  <tr className="w-full grid grid-cols-2 text-xl h-12 max-h-12 text-center leading-12 justify-center rounded-lg " key={gold.data}>
                    <td className="border-2 border-back rounded-lg bg-white">{gold.x.toLocaleDateString()}</td>
                    <td  className="border-2 border-back rounded-lg bg-white">{gold.y}</td>
                  </tr>
                ))}
      <div className="text=white bg-white mt-10 rounded-lg">
        <Chart options={goldPricesChartOptions} series={[{ data: goldPricesHistory }]}  height={350} type="line" />
      </div>
      <div className="text=white bg-white mt-10 rounded-lg">
        <Chart options={goldPricesChartOptions} series={[{ data: goldPricesHistory }]}  height={350} type="area" />
      </div>
      <div className="text=white bg-white mt-10 rounded-lg">
        <Chart options={goldPricesChartOptions2} series={[{ data: goldPricesHistory2 }]}  height={350} type="area" />
      </div>
      </div>
    </>
  );
};

export default CurrencyTable;
