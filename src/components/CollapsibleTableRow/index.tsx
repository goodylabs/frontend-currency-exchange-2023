import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import { CurrencyExchangeRate, Rate } from "api/models";
import { ChartHolder } from "components/ChartHolder";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getCodeExchangeRatesForLast14Days } from "api";
import { AxiosError } from "axios";

interface Props {
  rate: Rate;
}

export const CollapsibleTableRow = ({ rate }: Props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const { data } = useQuery<CurrencyExchangeRate, AxiosError>({
    queryKey: ["rate", { day: "last14days", code: rate.code }],
    queryFn: () => getCodeExchangeRatesForLast14Days(rate.code),
    enabled: open,
  });

  //
  const option14days = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    color: theme.palette.text.primary,
  };

  const data14days = {
    datasets: [
      {
        data: data?.rates.map((value) => {
          return { x: value.effectiveDate, y: value.mid };
        }),

        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };
  //
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rate.currency}
        </TableCell>
        <TableCell>{rate.code}</TableCell>
        <TableCell>{rate.mid}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  <ChartHolder>
                    <Line options={option14days} data={data14days} />
                  </ChartHolder>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
