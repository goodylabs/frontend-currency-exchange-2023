export const goldPriceOptions = [
  { id: 1, name: "Last 3 quotes", value: 3 },
  { id: 2, name: "Last 7 quotes", value: 7 },
  { id: 3, name: "Last 14 quotes", value: 14 },
  { id: 4, name: "Last 31 quotes", value: 31 },
  { id: 5, name: "Last 93 quotes", value: 93 },
];

export const goldPriceChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Gold Price",
    },
    legend: {
      display: false,
    },
  },
};

export const goldPriceChangeChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Gold Price Change",
    },
    legend: {
      display: false,
    },
  },
};
