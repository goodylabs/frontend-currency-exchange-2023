import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Currency = {
  currency: string;
  code: string;
  mid: string;
};

const CurrencyCard = () => {
  const [currency, setCurrency] = useState<Currency[]>();
  const [tableDate, setTableDate] = useState("");
  const [leftCurrency, setLeftCurrency] = useState("");

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

  const handleChange = (event: SelectChangeEvent) => {
    setLeftCurrency(event.target.value as string);
  };

  return (
    <Box>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          value={leftCurrency}
          label="currency"
          onChange={handleChange}
          labelId="demo-simple-select-label"
        >
          {currency?.map((item, index) => (
            <MenuItem
              key={index}
              value={`${item.code} ${item.currency}`}
            >{`${item.code} ${item.currency}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>{tableDate}</p>
    </Box>
  );
};

export default CurrencyCard;
