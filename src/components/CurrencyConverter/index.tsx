import { useState } from "react";
import { SwapHoriz } from "@mui/icons-material";
import { IconButton, Paper, Stack, Typography } from "@mui/material";

import { CurrencySelector, Option } from "components/CurrencySelector";

export const CurrencyConverter = () => {
  const [currValueLeft, setCurrValueLeft] = useState<{
    value: number | null;
    currency: Option | null;
  }>({ value: 1, currency: { label: "PLN", mid: 1 } });
  const [currValueRight, setCurrValueRight] = useState<{
    value: number | null;
    currency: Option | null;
  }>({ value: 1, currency: { label: "PLN", mid: 1 } });

  return (
    <Paper sx={{ margin: "1.5rem" }}>
      <Typography
        variant="h5"
        component="h2"
        marginTop="-1rem"
        marginLeft="1rem"
      >
        Currency Conventer
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap="0.5rem"
        alignItems="center"
        justifyContent="center"
        padding="1rem 1rem"
      >
        <CurrencySelector
          onChange={(newValue, newCurrency) => {
            setCurrValueLeft({ value: newValue, currency: newCurrency });
            if (newCurrency && currValueRight.currency && newValue)
              setCurrValueRight({
                value:
                  (newValue * newCurrency.mid) / currValueRight.currency.mid,
                currency: currValueRight.currency,
              });
          }}
          value={currValueLeft.value}
          currency={currValueLeft.currency}
        />
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => {
            setCurrValueLeft(currValueRight);
            setCurrValueRight(currValueLeft);
          }}
        >
          <SwapHoriz />
        </IconButton>
        <CurrencySelector
          onChange={(newValue, newCurrency) => {
            setCurrValueRight({ value: newValue, currency: newCurrency });
            if (currValueLeft.currency && newCurrency && newValue)
              setCurrValueLeft({
                value:
                  (newValue * newCurrency.mid) / currValueLeft.currency.mid,
                currency: currValueLeft.currency,
              });
          }}
          value={currValueRight.value}
          currency={currValueRight.currency}
        />
      </Stack>
    </Paper>
  );
};
