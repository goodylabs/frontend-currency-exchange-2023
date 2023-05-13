import { Alert, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { CurrencyContext } from "../home-page/CurrencyContext";

const CurrencyCard = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<number>(0);
  const [targetCurrency, setTargetCurrency] = useState("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState<number>(0);
  const currencyContext = useContext(CurrencyContext);

  if (currencyContext.isCurrencyDataLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      {currencyContext.currencyGetError ? (
        <Alert variant="outlined" severity="error">
          Something went wrong. Please try again later.
        </Alert>
      ) : (
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <CurrencySelect
            actualCurrency={baseCurrency}
            setActualCurrency={setBaseCurrency}
            currencyAmount={baseCurrencyAmount}
            setCurrencyAmount={setBaseCurrencyAmount}
            resultCurrencySelect={false}
          />
          <CurrencyExchangeIcon sx={{ fontSize: "2rem" }} />
          <CurrencySelect
            actualCurrency={targetCurrency}
            setActualCurrency={setTargetCurrency}
            currencyAmount={targetCurrencyAmount}
            setCurrencyAmount={setTargetCurrencyAmount}
            resultCurrencySelect={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default CurrencyCard;
