import { useEffect, useState } from "react";
import CurrencyConverter from "../currency-converter/CurrencyConverter";
import axios from "axios";
import { Currency, CurrencyContext } from "./CurrencyContext";
import CurrencyTable from "../currency-table/CurrencyTable";
import GoldSection from "../gold-section/GoldSection";
import { Box, Typography } from "@mui/material";
import "./HomePage.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CurrencyImg from "../../assets/Currency-bro.png";
import MenuBar from "../menu-bar/MenuBar";

const darkTheme = createTheme({
  typography: {
    fontFamily: "monospace",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#051531",
      paper: "#051531",
    },
    text: {
      primary: "#EAE8E4",
    },
    primary: {
      main: "#E0FF3B",
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          backgroundImage: "none",
        },
      },
    },
  },
});

const HomePage = () => {
  const [currencyData, setCurrencyData] = useState<Currency[] | null>(null);
  const [currencyTableDate, setCurrencyTableDate] = useState("");
  const [currencyGetError, setCurrencyGetError] = useState(false);
  const [isCurrencyDataLoading, setIsCurrencyDataLoading] = useState(false);

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = async () => {
    setIsCurrencyDataLoading(true);
    axios
      .get("http://api.nbp.pl/api/exchangerates/tables/a/")
      .then((response) => {
        setCurrencyData(response.data[0].rates);
        setCurrencyTableDate(response.data[0].effectiveDate);
      })
      .catch((error) => {
        setCurrencyGetError(true);
        console.log(error);
      })
      .finally(() => {
        setIsCurrencyDataLoading(false);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CurrencyContext.Provider
        value={{
          currencyData,
          currencyTableDate,
          currencyGetError,
          isCurrencyDataLoading,
        }}
      >
        <MenuBar />
        <Box className="home-page-container">
          <Box>
            <Typography
              variant="h2"
              align="center"
              sx={{
                maxWidth: "70rem",
                margin: "8rem auto",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              CHECK THE LATEST CURRENCY EXCHANGE RATES, GOLD PRICES AND EASILY
              CONVERT YOUR MONEY WITH GOODY CONVERTER
            </Typography>
          </Box>
          <Box className="currency-converter-container">
            <CurrencyConverter />
            <img
              src={CurrencyImg}
              alt="currency-gif"
              className="currency-img"
            />
          </Box>
          <Box className="gold-section-container">
            <Typography
              variant="h5"
              align="center"
              sx={{
                maxWidth: "70rem",
                margin: "4rem auto",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              CHECK THE LATEST GOLD PRICES UP TO 90 DAYS
            </Typography>
            <GoldSection />
          </Box>
          <Box className="currency-table-container">
            <Typography
              variant="h5"
              align="center"
              sx={{
                maxWidth: "70rem",
                margin: "4rem auto",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              CHECK THE LATEST CURRENCY EXCHANGE RATES
            </Typography>
            <CurrencyTable />
          </Box>
        </Box>
      </CurrencyContext.Provider>
    </ThemeProvider>
  );
};

export default HomePage;
