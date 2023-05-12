import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "styled-components";

import { GetExchangeRatesForToday } from "api";
import { useQuery } from "@tanstack/react-query";
import { CollapsibleTable } from "components/CollapsibleTable";
import { Skeleton, Typography } from "@mui/material";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.secondary.main};
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 60%;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-grow: 0;
    max-width: 100%;
  }
`;

export const ExchangeRates = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: GetExchangeRatesForToday,
  });

  if (!data) {
    return <Skeleton />;
  }
  return (
    <Wrapper>
      <Typography variant="h3">
        Exchange Rates for day: {data[0].effectiveDate}
      </Typography>
      <CollapsibleTable exchangeRate={data[0]} />
    </Wrapper>
  );
};
