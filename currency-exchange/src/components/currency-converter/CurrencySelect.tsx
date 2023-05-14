import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { CurrencyContext } from "../home-page/CurrencyContext";
import { useContext } from "react";

const CurrencySelect = ({
  actualCurrency,
  setActualCurrency,
  currencyAmount,
  setCurrencyAmount,
  resultCurrencySelect,
}: {
  actualCurrency: string;
  setActualCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyAmount: number;
  setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>;
  resultCurrencySelect: boolean;
}) => {
  const currencyContext = useContext(CurrencyContext);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setActualCurrency(event.target.value as string);
  };

  const handleCurrencyAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrencyAmount(Number(event.target.value));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <FormControl fullWidth>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          value={actualCurrency}
          label="currency"
          onChange={handleCurrencyChange}
          labelId="currency-label"
          variant="outlined"
        >
          {currencyContext.currencyData &&
            currencyContext.currencyData.map((item, index) => (
              <MenuItem
                key={index}
                value={item.code}
              >{`${item.code} ${item.currency}`}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        label="Amount"
        variant="outlined"
        value={currencyAmount}
        disabled={resultCurrencySelect}
        onChange={handleCurrencyAmountChange}
      />
    </Box>
  );
};

export default CurrencySelect;
