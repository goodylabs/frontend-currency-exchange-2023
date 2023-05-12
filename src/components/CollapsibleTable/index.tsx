import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CollapsibleTableRow } from "components/CollapsibleTableRow";

import { ExchangeRate } from "api/models";

interface Props {
  exchangeRate: ExchangeRate;
}

export const CollapsibleTable = ({ exchangeRate }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Currency name</TableCell>
            <TableCell>Currency code</TableCell>
            <TableCell>Average exchange rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeRate.rates.map((row) => (
            <CollapsibleTableRow key={row.code} rate={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
