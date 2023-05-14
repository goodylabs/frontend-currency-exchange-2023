import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Alert,
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CurrencyDayData } from "../home-page/CurrencyContext";
import CurrencyChart from "./CurrencyChart";
import "./CurrencyTable.css";

const CurrencyTableRow = ({
  currency,
  mid,
  code,
}: {
  currency: string;
  mid: string;
  code: string;
}) => {
  const TABLE = "a";
  const TIME_SPAN = "14";
  const [currencyData, setCurrencyData] = useState<CurrencyDayData[] | null>(
    null
  );
  const [isCurrencyDataLoading, setIsCurrencyDataLoading] = useState(true);
  const [currencyIsError, setCurrencyIsError] = useState(false);
  const [isOpenRow, setIsOpenRow] = useState(false);

  const handleOpenRow = () => {
    setIsOpenRow(!isOpenRow);
    getPreviousCurrencyRates();
  };

  const getPreviousCurrencyRates = async () => {
    axios
      .get(
        `https://api.nbp.pl/api/exchangerates/rates/${TABLE}/${code}/last/${TIME_SPAN}/`
      )
      .then((response) => {
        response.status === 200 && setCurrencyData(response.data.rates);
      })
      .catch((error) => {
        setCurrencyIsError(true);
        console.log(error);
      })
      .finally(() => {
        setIsCurrencyDataLoading(false);
      });
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={handleOpenRow}>
            {isOpenRow ? (
              <KeyboardArrowUpIcon color="primary" />
            ) : (
              <KeyboardArrowDownIcon color="primary" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {code}
        </TableCell>
        <TableCell align="center">{currency}</TableCell>
        <TableCell align="center">{mid}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpenRow} timeout="auto" unmountOnExit>
            {currencyIsError && (
              <Box className="error-info-container">
                <Alert severity="error">Error while fetching data</Alert>
              </Box>
            )}
            {isCurrencyDataLoading && (
              <Box className="error-info-container">
                <CircularProgress color="primary" />
              </Box>
            )}
            {currencyData && (
              <CurrencyChart
                currencyDaysData={currencyData}
                currencyCode={code}
              ></CurrencyChart>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CurrencyTableRow;
