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
        backgroundColor: "rgb(255, 255, 59, 0.9)",
        borderColor: "rgba(255, 255, 59, 0.9)",
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
          color: "rgba(234, 232, 228, 0.2)",
        },
        ticks: {
          maxTicksLimit: 7,
          color: "rgb(234, 232, 228)",
          font: {
            family: "monospace",
          },
        },
        display: true,
      },
      y: {
        grid: {
          color: "rgba(234, 232, 228, 0.2)",
        },
        ticks: {
          color: "rgb(234, 232, 228)",
          font: {
            family: "monospace",
          },
        },
      },
    },

    plugins: {
      title: {
        display: true,
        color: "rgb(234, 232, 228)",
        text: `Gold prices of last ${arrayDaysAmount} days`,
        font: {
          size: 20,
          family: "monospace",
        },
      },
    },
  };

  return (
    <Box sx={{ margin: "2rem", width: "60rem" }}>
      <Line data={chartData} options={options}></Line>
    </Box>
  );
};

export default GoldChart;
