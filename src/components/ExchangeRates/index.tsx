import { getCurrentExchangeRates } from "api";
import { useQuery } from "@tanstack/react-query";
import { CollapsibleTable } from "components/CollapsibleTable";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { ExchangeRate } from "api/models";
import { AxiosError } from "axios";

export const ExchangeRates = () => {
  const { data } = useQuery<[ExchangeRate], AxiosError>({
    queryKey: ["exchangeRates", { day: "latest" }],
    queryFn: getCurrentExchangeRates,
  });

  if (!data) {
    return (
      <Skeleton
        width={471}
        height={2137}
        sx={{
          margin: "1.5rem",
          transform: "none",
        }}
      />
    );
  }

  return (
    <Paper sx={{ margin: "1.5rem", flexGrow: { xs: 0, lg: 1 } }}>
      <Typography
        variant="h5"
        component="h2"
        marginTop="-1rem"
        marginLeft="1rem"
      >
        Exchange Rates for day: {data[0].effectiveDate}
      </Typography>
      <Stack
        direction="column"
        gap="0.5rem"
        alignItems="center"
        justifyContent="center"
        padding="1rem 1rem"
      >
        <CollapsibleTable exchangeRate={data[0]} />
      </Stack>
    </Paper>
  );
};
