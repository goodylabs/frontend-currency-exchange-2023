import { Alert, Box, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { CurrencyContext } from "../home-page/CurrencyContext";
import { CurrencyContextInterface } from "../home-page/CurrencyContext";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<number>(0);
  const [targetCurrency, setTargetCurrency] = useState("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState<number>(0);
  const currencyContext = useContext<CurrencyContextInterface>(CurrencyContext);

  useEffect(() => {
    setTargetCurrencyValue();
  }, [baseCurrencyAmount]);

  if (currencyContext.isCurrencyDataLoading) {
    return <div>loading...</div>;
  }

  const setTargetCurrencyValue = () => {
    if (currencyContext) {
      const baseCurrencyRate = currencyContext.currencyData?.find(
        (item) => item.code === baseCurrency
      )?.mid;
      const targetCurrencyRate = currencyContext.currencyData?.find(
        (item) => item.code === targetCurrency
      )?.mid;
      if (baseCurrencyRate && targetCurrencyRate) {
        setTargetCurrencyAmount(
          (parseFloat(baseCurrencyRate) / parseFloat(targetCurrencyRate)) *
            baseCurrencyAmount
        );
      }
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "2rem",
        boxShadow: "3",
        borderRadius: "1rem",
      }}
    >
      {currencyContext.currencyGetError ? (
        <Alert variant="outlined" severity="error">
          Something went wrong. Please try again later.
        </Alert>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              margin: "0 auto",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            CONVERT CURRENCY
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CurrencySelect
              actualCurrency={baseCurrency}
              setActualCurrency={setBaseCurrency}
              currencyAmount={baseCurrencyAmount}
              setCurrencyAmount={setBaseCurrencyAmount}
              resultCurrencySelect={false}
            />
            <CurrencyExchangeIcon color="primary" sx={{ fontSize: "2rem" }} />
            <CurrencySelect
              actualCurrency={targetCurrency}
              setActualCurrency={setTargetCurrency}
              currencyAmount={targetCurrencyAmount}
              setCurrencyAmount={setTargetCurrencyAmount}
              resultCurrencySelect={true}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default CurrencyConverter;
