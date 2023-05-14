import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';
import {useCallback, useContext, useEffect, useState} from "react";
import classes from "../../sass/components/GoldChart.module.scss";
import {filterLength} from "../../utility/globals/numbers";
import {goldContext} from "../../context/GoldProvider";
import {GoldContext, GoldsWithGrowth} from "../../types/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    PointElement,
    LineElement,
);

interface ChartProps {
  chartType: "bar" | "line"
}

const GoldChart = ({chartType}:ChartProps) => {
  const goldCtx = useContext<GoldContext>(goldContext);
  const[filterType, setFilterType] = useState<"week" | "month" | "all">("week");
  const[filteredData, setFilteredData] = useState<GoldsWithGrowth[]>(goldCtx.goldWithGrowth);
  const filterData = useCallback(() =>{
    switch (filterType){
      case "week":
        setFilteredData(goldCtx.goldWithGrowth.slice(0, filterLength.week));
        break;
      case "month":
        setFilteredData(goldCtx.goldWithGrowth.slice(0, filterLength.month));
        break;
      case "all":
        setFilteredData(goldCtx.goldWithGrowth);
    }
  }, [goldCtx, filterType])
  useEffect(() =>{
    filterData();
  },[filterType, filterData])


  const labels = filteredData.map(entry => entry.data);
  const findMinMaxExchange = (type: "min" | "max") => {
    const allPrices = chartType === "bar" ? filteredData.map(entry => entry.cena) : filteredData.map(entry => entry.growth) as unknown as number[];
    return type === "min" ? Math.round(Math.min(...allPrices)) : Math.round(Math.max(...allPrices));
  }


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales:{
      y:{
        max: findMinMaxExchange("max") + 2,
        min: chartType === "bar" ? (findMinMaxExchange("min") - 2 < 0 ? 0 : findMinMaxExchange("min") - 2) : findMinMaxExchange("min") - 1
      }
    }
  } as ChartOptions<"bar" | "line">;
  const chartData = {
    labels,
    datasets: [
      {
        label: chartType === "bar" ? 'Price' : 'Growth',
        // @ts-expect-error label is not used here
        data: chartType ==="bar" ? labels.map((label, idx) => filteredData[idx].cena) : labels.map((label, idx) => filteredData[idx].growth) ,
        borderColor: chartType === "bar" ? '' : 'rgb(50, 104, 205)',
        backgroundColor: chartType ==="bar" ? 'rgb(208, 173, 57)' : 'rgb(50, 104, 205)',
      },
    ],
  } as ChartData<"bar" | "line", number[]>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
      <div className={classes['gold-chart']}>
        <div className={classes['gold-chart__header']}>
          <h2>{chartType === "bar" ? "Prices history" : "Growth history"}</h2>
          <div className={classes['gold-chart__header__actions']}>
            <button onClick={() => setFilterType("week")} className={filterType === "week" ? `${classes['gold-chart__header__actions__action']} ${classes['gold-chart__header__actions__action--active']}` : classes['gold-chart__header__actions__action']}>Last 7</button>
            <button onClick={() => setFilterType("month")} className={filterType === "month" ? `${classes['gold-chart__header__actions__action']} ${classes['gold-chart__header__actions__action--active']}` : classes['gold-chart__header__actions__action']}>Last 30</button>
            <button onClick={() => setFilterType("all")} className={filterType === "all" ? `${classes['gold-chart__header__actions__action']} ${classes['gold-chart__header__actions__action--active']}` : classes['gold-chart__header__actions__action']}>All</button>
          </div>
        </div>
        {/*@ts-expect-error chart lib had a strange issues while typing this data*/}
        {chartType === "bar" ? <Bar options={options} data={chartData}/> : <Line options={options} data={chartData} />}

      </div>

  )

}
export default GoldChart;