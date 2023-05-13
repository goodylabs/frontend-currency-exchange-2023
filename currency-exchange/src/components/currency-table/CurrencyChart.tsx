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
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 6,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: `${currencyCode} mid values of last 14 days`,
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <Line data={chartData} options={options}></Line>
    </Box>
  );
};

export default CurrencyChart;
