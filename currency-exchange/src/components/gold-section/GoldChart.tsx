import { GoldDataType } from "./GoldTypes";
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
import { Box } from "@mui/material";
import "./GoldSection.css";
import { BACKGROUND_COLOR } from "../../ChartConstants";
import { BORDER_COLOR } from "../../ChartConstants";
import { GRID_COLOR } from "../../ChartConstants";
import { TEXT_COLOR } from "../../ChartConstants";
import { FONT_FAMILY } from "../../ChartConstants";
import { FONT_SIZE } from "../../ChartConstants";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title
);

const GoldChart = ({
  goldData,
  arrayDaysAmount,
}: {
  goldData: GoldDataType[];
  arrayDaysAmount: number;
}) => {
  const END_INDEX = 90;
  const chartData = {
    labels: goldData
      .slice(END_INDEX - arrayDaysAmount, END_INDEX)
      .map((day) => day.data),
    datasets: [
      {
        label: `Gold price`,
        data: goldData
          .slice(END_INDEX - arrayDaysAmount, END_INDEX)
          .map((day) => day.cena),
        fill: false,
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
        pointRadius: 4,
        pointHoverRadius: 3,
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
        text: `Gold prices of last ${arrayDaysAmount} days`,
        font: {
          size: FONT_SIZE,
          family: FONT_FAMILY,
        },
      },
    },
  };

  return (
    <Box className="gold-section-chart-container">
      <Line data={chartData} options={options}></Line>
    </Box>
  );
};

export default GoldChart;
