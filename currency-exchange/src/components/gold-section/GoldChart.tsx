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

const GoldChart = ({ goldData }: { goldData: GoldDataType[] }) => {
  const chartData = {
    labels: goldData.map((day) => day.data),
    datasets: [
      {
        label: `Gold price`,
        data: goldData.map((day) => day.cena),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 4,
        pointHoverRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: `Gold prices of last 90 days`,
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

export default GoldChart;
