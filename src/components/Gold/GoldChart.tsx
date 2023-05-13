import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions, ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, {useCallback, useContext, useEffect, useState} from "react";
import classes from "../../sass/components/GoldChart.module.scss";
import {goldEntries} from "../../pages/GoldPage";
import {filterLength} from "../../utility/globals/numbers";
import {GoldContext, goldContext} from "../../context/GoldProvider";

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
  const goldCtx = useContext<GoldContext>(goldContext);
  const[filterType, setFilterType] = useState<"week" | "month" | "all">("week");
  const[filteredData, setFilteredData] = useState<goldEntries>(goldCtx.goldWithGrowth);
  const filterData = useCallback(() =>{
    switch (filterType){
      case "week":
        setFilteredData(goldCtx.goldWithGrowth.slice(goldCtx.goldWithGrowth.length - filterLength.week));
        break;
      case "month":
        setFilteredData(goldCtx.goldWithGrowth.slice(goldCtx.goldWithGrowth.length - filterLength.month));
        break;
      case "all":
        setFilteredData(goldCtx.goldWithGrowth);
    }
  }, [data, filterType])
  // const filterData = () => {
  // }
  useEffect(() =>{
    filterData();
  },[filterType, filterData])


  const labels = filteredData.map(entry => entry.data);
  const findMinMaxExchange = (type: "min" | "max") => {
    const allPrices = filteredData.map(entry => entry.cena);
    return type === "min" ? Math.round(Math.min(...allPrices)) : Math.round(Math.max(...allPrices));
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales:{
      y:{
        max: findMinMaxExchange("max") + 2,
        min: findMinMaxExchange("min") - 2 < 0 ? 0 : findMinMaxExchange("min") - 2
      }
    }
  } as ChartOptions<"bar">;
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: labels.map((label, idx) => filteredData[idx].cena),
        backgroundColor: 'rgb(208, 173, 57)',
      },
    ],
  } as ChartData<"bar", number[]>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
      <div className={classes['gold-chart']}>
        <div className={classes['gold-chart__header']}>
          <h2>Prices history</h2>
          <div className={classes['gold-chart__header__actions']}>
            <button onClick={() => setFilterType("week")} className={filterType === "week" ? `${classes['gold-chart__header__actions__action']} ${classes['gold-chart__header__actions__action--active']}` : classes['gold-chart__header__actions__action']}>Last 7</button>
            <button onClick={() => setFilterType("month")} className={filterType === "month" ? `${classes['gold-chart__header__actions__action']} ${classes['gold-chart__header__actions__action--active']}` : classes['gold-chart__header__actions__action']}>Last 30</button>
            <button onClick={() => setFilterType("all")} className={filterType === "all" ? `${classes['gold-chart__header__actions__action']} ${classes['gold-chart__header__actions__action--active']}` : classes['gold-chart__header__actions__action']}>All</button>
          </div>
        </div>

        <Bar options={options} data={chartData}/>
      </div>

  )

}
export default GoldChart;