import { Alert, Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { CurrencyContext } from "../home-page/CurrencyContext";
import { CurrencyContextInterface } from "../home-page/CurrencyContext";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<number>(0);
  const [targetCurrency, setTargetCurrency] = useState("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState<number>(0);
  const currencyContext = useContext<CurrencyContextInterface>(CurrencyContext);

  useEffect(() => {
    setTargetCurrencyValue();
  }, [baseCurrencyAmount, baseCurrency, targetCurrency]);

  if (currencyContext.isCurrencyDataLoading) {
    return (
      <Box>
        <CircularProgress color="primary" />
      </Box>
    );
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
    <Paper variant="outlined" className="currency-converter-container">
      {currencyContext.currencyGetError ? (
        <Alert variant="outlined" severity="error">
          Something went wrong. Please try again later.
        </Alert>
      ) : (
        <Box className="currency-converter-box">
          <Typography
            className="currency-converter-title"
            variant="h5"
            align="center"
          >
            CONVERT CURRENCY
          </Typography>
          <Box className="currency-select-container">
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
