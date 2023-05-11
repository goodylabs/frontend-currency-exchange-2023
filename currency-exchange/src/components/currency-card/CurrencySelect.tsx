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
}: {
  actualCurrency: string;
  setActualCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyAmount: number;
  setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setActualCurrency(event.target.value as string);
  };

  const currencyContext = useContext(CurrencyContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <FormControl fullWidth sx={{ maxWidth: "15rem" }}>
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
                value={`${item.code} ${item.currency}`}
              >{`${item.code} ${item.currency}`}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        label="Amount"
        variant="outlined"
        value={currencyAmount}
        defaultValue={1}
        onChange={(e) => setCurrencyAmount(Number(e.target.value))}
      />
    </Box>
  );
};

export default CurrencySelect;
