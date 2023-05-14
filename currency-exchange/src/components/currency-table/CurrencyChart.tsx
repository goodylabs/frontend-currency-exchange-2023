import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CurrencyDayData } from "../home-page/CurrencyContext";
import { Box } from "@mui/material";
import "./CurrencyTable.css";
import {
  BACKGROUND_COLOR,
  BORDER_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  GRID_COLOR,
  TEXT_COLOR,
} from "../../ChartConstants.ts";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title
);

const CurrencyChart = ({
  currencyDaysData,
  currencyCode,
}: {
  currencyDaysData: CurrencyDayData[];
  currencyCode: string;
}) => {
  const chartData = {
    labels: currencyDaysData.map((day) => day.effectiveDate),
    datasets: [
      {
        label: `${currencyCode} mid value`,
        data: currencyDaysData.map((day) => day.mid),
        fill: false,
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
        pointRadius: 6,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,

    scales: {
      x: {
        grid: {
          color: GRID_COLOR,
        },
        ticks: {
          maxTicksLimit: 7,
          color: TEXT_COLOR,
          font: {
            family: FONT_FAMILY,
          },
        },
        display: true,
      },
      y: {
        grid: {
          color: GRID_COLOR,
        },
        ticks: {
          color: TEXT_COLOR,
          font: {
            family: FONT_FAMILY,
          },
        },
      },
    },

    plugins: {
      title: {
        display: true,
        color: TEXT_COLOR,
        text: `${currencyCode} mid values of last 14 days`,
        font: {
          size: FONT_SIZE,
          family: FONT_FAMILY,
        },
      },
    },
  };

  return (
    <Box className="currency-chart-container">
      <Line data={chartData} options={options}></Line>
    </Box>
  );
};

export default CurrencyChart;
