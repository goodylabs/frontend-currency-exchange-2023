import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { ButtonStuffType, TimeFrameType } from './GoldPriceChart.types';

const buttonStuff: ButtonStuffType = {
  '2w': 14,
  '1m': 31,
  '3m': 93,
  '6m': 185,
  '1y': 365,
  '2y': 730,
  '5y': 1825,
};

const modeLookup = {
  '2w': '2 weeks',
  '1m': '1 month',
  '3m': '3 months',
  '6m': '6 months',
  '1y': '1 year',
  '2y': '2 years',
  '5y': '5 years',
};

const timeframe: TimeFrameType = {
  14: 14,
  31: 31,
  93: 31,
  185: 31,
  365: 31,
  730: 31,
  1825: 31,
};

export function GoldPriceChart() {
  const [mode, setMode] = useState<keyof ButtonStuffType>('1m');
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }>({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGoldPrices() {
      try {
        setIsLoading(true);
        const baseUrl = `${import.meta.env.VITE_API_URL}/cenyzlota`;

        const totalDays = buttonStuff[mode];
        const dataPoints = timeframe[totalDays];

        // Calculate the start date based on the number of data points and the end date

        const startDate = new Date(Date.now() - totalDays * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const urls = [];
        const dateLabels = [];
        urls.push(`${baseUrl}/${startDate}/`);
        dateLabels.push(startDate);
        for (let i = 0; i < dataPoints; i++) {
          // Add a proportional number of days to the start date for each data point
          const daysToAdd = Math.floor((i + 1) * (totalDays / dataPoints));
          const date = new Date(new Date(startDate).getTime() + daysToAdd * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
          urls.push(`${baseUrl}/${date}/`);
          dateLabels.push(date);
        }

        const promises = urls.map((url) => axios.get(url));
        const results = await Promise.allSettled(promises);

        const prices: number[] = results.map(
          (result) => {
            if (result.status === 'fulfilled') {
              return result.value.data[0].cena;
            } else {
              return -1;
            }
          },
          [mode]
        );

        const filteredDateArray = dateLabels.filter((_, index) => prices[index] !== -1);
        const filteredPricesArray = prices.filter((price) => price !== -1);

        const updatedData = {
          labels: filteredDateArray,
          datasets: [
            {
              label: 'Gold price(PLN)',
              data: filteredPricesArray,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };

        setData(updatedData);
        setIsLoading(false);
      } catch (error) {
      } finally {
        console.clear();
        setIsLoading(false);
      }
    }

    fetchGoldPrices();
  }, [mode]);

  return (
    <Grid
      item
      container
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid
        item
        marginTop={6}
      >
        <Typography
          color={'#388087'}
          fontSize={'3rem'}
        >
          Gold price(PLN/g) - {modeLookup[mode as keyof ButtonStuffType]} view
        </Typography>
        <Grid
          item
          container
          justifyContent={'center'}
          alignItems={'center'}
        >
          {Object.keys(buttonStuff).map((key, index) => (
            <Button
              key={index}
              onClick={() => {
                setMode(key as keyof ButtonStuffType);
              }}
            >
              {key}
            </Button>
          ))}
        </Grid>
      </Grid>

      <Grid
        item
        container
        justifyContent={'center'}
        alignItems={'center'}
        width={'80%'}
        marginTop={8}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Chart
            type='line'
            data={data}
            style={{ width: '80%', backgroundColor: '#f8f8f5' }}
            options={{
              scales: { y: { beginAtZero: true } },
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
