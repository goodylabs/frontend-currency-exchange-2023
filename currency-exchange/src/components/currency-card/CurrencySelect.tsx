import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

type Currency = {
  currency: string;
  code: string;
  mid: string;
};

const CurrencySelect = ({
  currency,
  actualCurrency,
  setActualCurrency,
  currencyAmount,
  setCurrencyAmount,
}: {
  currency: Currency[] | undefined;
  actualCurrency: string;
  setActualCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyAmount: number;
  setCurrencyAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setActualCurrency(event.target.value as string);
  };
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
          {currency?.map((item, index) => (
            <MenuItem
              key={index}
              value={`${item.code} ${item.currency}`}
            >{`${item.code} ${item.currency}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Amount"
        variant="outlined"
        value={currencyAmount}
        onChange={(e) => setCurrencyAmount(Number(e.target.value))}
      />
    </Box>
  );
};

export default CurrencySelect;
