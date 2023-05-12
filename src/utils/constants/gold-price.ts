export const goldPriceOptions = [
  { id: 1, name: "Last 3 days", value: 3 },
  { id: 2, name: "Last week", value: 7 },
  { id: 3, name: "Last 2 weeks", value: 14 },
  { id: 4, name: "Last month", value: 31 },
  { id: 5, name: "Last 3 months", value: 93 },
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
