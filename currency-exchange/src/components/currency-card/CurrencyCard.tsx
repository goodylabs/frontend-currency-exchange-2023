import { Box, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

type Currency = {
  currency: string;
  code: string;
  mid: string;
};

const CurrencyCard = () => {
  const [currency, setCurrency] = useState<Currency[]>();
  const [tableDate, setTableDate] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("");
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0);

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = async () => {
    const response = await axios.get(
      "http://api.nbp.pl/api/exchangerates/tables/a/"
    );
    console.log(response);
    console.log(response.data[0].rates);
    setCurrency(response.data[0].rates);
    setTableDate(response.data[0].effectiveDate);
  };

  return (
    <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <CurrencySelect
        currency={currency}
        actualCurrency={baseCurrency}
        setActualCurrency={setBaseCurrency}
        currencyAmount={baseCurrencyAmount}
        setCurrencyAmount={setBaseCurrencyAmount}
      />
      <CurrencyExchangeIcon sx={{ fontSize: "2rem" }} />
      <CurrencySelect
        currency={currency}
        actualCurrency={targetCurrency}
        setActualCurrency={setTargetCurrency}
        currencyAmount={targetCurrencyAmount}
        setCurrencyAmount={setTargetCurrencyAmount}
      />
    </Box>
  );
};

export default CurrencyCard;
