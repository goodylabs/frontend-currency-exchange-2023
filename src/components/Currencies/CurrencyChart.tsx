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
import {LastExchangeData} from "./CurrencyView";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

interface ChartProps {
    data: LastExchangeData,
    loading: boolean
}


export function CurrencyChart({data, loading}:ChartProps) {
    const labels = data.rates.map(rate => rate.effectiveDate);
    const findMinMaxExchange = (type: "min" | "max") => {
      const allMids = data.rates.map(rate => rate.mid);
      return type === "min" ? Math.min(...allMids) : Math.max(...allMids);
    }
     const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
            y:{
                max: findMinMaxExchange("max") + 0.06,
                min: findMinMaxExchange("min") - 0.06 < 0 ? 0 : findMinMaxExchange("min") - 0.06
            }
        }
    } as ChartOptions<"bar">;
     const chartData = {
        labels,
        datasets: [
            {
                label: 'Rate',
                data: labels.map((label, idx) => data.rates[idx].mid),
                backgroundColor: 'rgb(208, 173, 57)',
            },
        ],
    } as ChartData<"bar", number[]>;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <>
            {!loading && <Bar options={options} data={chartData}/>}
            {loading && <p>Acquiring data...</p>}
        </>

    );
}
export default CurrencyChart;