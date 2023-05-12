import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions, ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from "react";
import classes from "../../sass/components/GoldChart.module.scss";
import {goldEntries} from "../../pages/GoldPage";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

interface ChartProps {
  data: goldEntries,
  loading: boolean
}

const GoldChart = ({data}:ChartProps) => {
  const labels = data.map(entry => entry.data);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales:{
    }
  } as ChartOptions<"bar">;
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Rate',
        data: labels.map((label, idx) => data[idx].cena),
        backgroundColor: 'rgb(208, 173, 57)',
      },
    ],
  } as ChartData<"bar", number[]>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
      <div className={classes['gold-chart']}>
        <h2>Gold prices history</h2>
        <Bar options={options} data={chartData}/>
      </div>

  )

}
export default GoldChart;