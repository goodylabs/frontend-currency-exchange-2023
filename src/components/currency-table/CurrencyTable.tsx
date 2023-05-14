import {
  Box,
  CircularProgress,
  Paper,
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
    return (
      <Box>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Paper className="currency-table-container" variant="outlined">
      <TableContainer sx={{ maxHeight: "70vh" }}>
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
    </Paper>
  );
};

export default CurrencyTable;
