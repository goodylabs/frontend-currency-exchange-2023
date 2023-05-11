import { Alert, Box } from "@mui/material";
import { useContext, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { CurrencyContext } from "../home-page/CurrencyContext";

const CurrencyCard = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0);
  const currencyContext = useContext(CurrencyContext);

  return (
    <>
      {currencyContext.currencyData === null &&
      !currencyContext.currencyGetError ? (
        <div>loading...</div>
      ) : (
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {currencyContext.currencyGetError ? (
            <Alert variant="outlined" severity="error">
              Something went wrong. Please try again later.
            </Alert>
          ) : (
            <>
              <CurrencySelect
                actualCurrency={baseCurrency}
                setActualCurrency={setBaseCurrency}
                currencyAmount={baseCurrencyAmount}
                setCurrencyAmount={setBaseCurrencyAmount}
              />
              <CurrencyExchangeIcon sx={{ fontSize: "2rem" }} />
              <CurrencySelect
                actualCurrency={targetCurrency}
                setActualCurrency={setTargetCurrency}
                currencyAmount={targetCurrencyAmount}
                setCurrencyAmount={setTargetCurrencyAmount}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default CurrencyCard;
