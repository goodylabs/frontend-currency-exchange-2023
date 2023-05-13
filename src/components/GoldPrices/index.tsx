import * as React from "react";
import Box from "@mui/material/Box";
import {
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Line } from "react-chartjs-2";

import { getGoldPricesForLast30Days } from "api";
import { TabPanel } from "components/TabPanel";
import { GoldPrice } from "api/models";
import { ChartHolder } from "components/ChartHolder";

export const GoldPrices = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useQuery<[GoldPrice], AxiosError>({
    queryKey: ["goldPrice", { day: "last30days" }],
    queryFn: getGoldPricesForLast30Days,
  });

  if (!data) {
    return (
      <Skeleton
        sx={{
          margin: "1.5rem",
          width: "100%",
          height: "46.5rem",
          transform: "none",
        }}
      />
    );
  }

  //
  const option5days = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    color: theme.palette.text.primary,
  };

  const data5days = {
    datasets: [
      {
        data: data.slice(-5).map((value) => {
          return { x: value.data, y: value.cena };
        }),

        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const option30days = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    color: theme.palette.text.primary,
  };

  const data30days = {
    datasets: [
      {
        data: data.map((value) => {
          return { x: value.data, y: value.cena };
        }),

        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };
  //

  return (
    <Paper
      sx={{
        margin: "1.5rem",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        marginTop="-1rem"
        marginLeft="1rem"
      >
        Gold Prices for day: {data.at(-1)?.data}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="5 days" />
            <Tab label="30 days" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ChartHolder>
            <Line options={option5days} data={data5days} />
          </ChartHolder>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChartHolder>
            <Line options={option30days} data={data30days} />
          </ChartHolder>
        </TabPanel>
      </Box>

      <Stack
        direction="column"
        gap="0.5rem"
        alignItems="center"
        justifyContent="center"
        padding="1rem 1rem"
      ></Stack>
    </Paper>
  );
};
