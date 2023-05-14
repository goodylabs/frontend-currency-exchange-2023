import {BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartOptions, LinearScale, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {LastExchangeData} from "../../types/types";
import classes from "../../sass/components/CurrencyChart.module.scss";

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
                suggestedMax: findMinMaxExchange("max") + 0.001,
                min: findMinMaxExchange("min") - 0.01 < 0 ? 0 : findMinMaxExchange("min") - 0.01
            }
        }
    } as ChartOptions<"bar">;
     const chartData = {
        labels,
        datasets: [
            {
                label: 'Rate',
                // @ts-expect-error label is not used here
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
            {loading && <p className={classes.message}>Acquiring data...</p>}
        </>

    );
}
export default CurrencyChart;