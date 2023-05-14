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
        backgroundColor: "rgb(255, 255, 59, 0.9)",
        borderColor: "rgba(255, 255, 59, 0.9)",
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
        text: `${currencyCode} mid values of last 14 days`,
        font: {
          size: 20,
          family: "monospace",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        margin: "2rem",
        maxHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Line data={chartData} options={options}></Line>
    </Box>
  );
};

export default CurrencyChart;
