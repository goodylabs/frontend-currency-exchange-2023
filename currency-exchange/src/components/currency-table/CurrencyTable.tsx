import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { CurrencyContext } from "../home-page/CurrencyContext";
import CurrencyTableRow from "./CurrencyTableRow";

const CurrencyTable = () => {
  const currencyContext = useContext(CurrencyContext);

  if (currencyContext.isCurrencyDataLoading) {
    return <div>loading...</div>;
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Code</TableCell>
            <TableCell align="center">Currency</TableCell>
            <TableCell align="center">{`Mid Value (${currencyContext.currencyTableDate})`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyContext.currencyData &&
            currencyContext.currencyData.map((row) => (
              <CurrencyTableRow key={row.code} {...row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrencyTable;