import { getCurrentExchangeRates } from "api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ExchangeRate } from "api/models";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import { styled } from "styled-components";

export interface Option {
  label: string;
  mid: number;
}

interface Props {
  onChange(newValue: number | null, newCurrency: Option | null): void;
  value: number | null;
  currency: Option | null;
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
`;

export const CurrencySelector = ({ onChange, value, currency }: Props) => {
  const { data } = useQuery<[ExchangeRate], AxiosError>({
    queryKey: ["exchangeRates", { day: "latest" }],
    queryFn: getCurrentExchangeRates,
  });

  if (!data) {
    return <Skeleton sx={{ width: "100%", height: "5.6rem" }} />;
  }

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parsedValue = parseFloat(event.target.value);
    if (event.target.value === "") return onChange(null, currency);
    if (Number.isNaN(parsedValue)) return;

    onChange(parsedValue, currency);
  };

  const Currencies = data[0].rates.map((value) => {
    return { label: value.code, mid: value.mid };
  });
  return (
    <Wrapper>
      <TextField
        id="outlined-number"
        label="Value"
        type="number"
        onChange={handleValueChange}
        value={value}
        InputLabelProps={{ shrink: true }}
      />
      <Autocomplete
        disablePortal
        id="combo-box-currency"
        options={[{ label: "PLN", mid: 1 }, ...Currencies]}
        sx={{ minWidth: 130 }}
        renderInput={(params) => <TextField {...params} label="Currency" />}
        onChange={(_, option) => onChange(value, option)}
        value={currency}
        isOptionEqualToValue={(option, value) => option.label === value.label}
      />
    </Wrapper>
  );
};
