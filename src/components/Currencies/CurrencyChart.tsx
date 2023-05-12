import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartOptions, ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
} as ChartOptions<"bar">;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "sf","bvb","sdfsdf","werwer", "dfgd"];

export const data = {
    labels,
    datasets: [
        {
            label: 'Rate',
            data: labels.map((label, idx) => idx),
            backgroundColor: 'rgb(208, 173, 57)',
        },
    ],
} as ChartData<"bar", number[]>;

export function CurrencyChart() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Bar options={options} data={data} />;
}
export default CurrencyChart;