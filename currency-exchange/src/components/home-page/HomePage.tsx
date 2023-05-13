import { useEffect, useState } from "react";
import CurrencyConverter from "../currency-converter/CurrencyConverter";
import axios from "axios";
import { Currency, CurrencyContext } from "./CurrencyContext";
import CurrencyTable from "../currency-table/CurrencyTable";
import GoldSection from "../gold-section/GoldSection";

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
    <div>
      <CurrencyContext.Provider
        value={{
          currencyData,
          currencyTableDate,
          currencyGetError,
          isCurrencyDataLoading,
        }}
      >
        <CurrencyConverter />
        <CurrencyTable />
        <GoldSection />
      </CurrencyContext.Provider>
    </div>
  );
};

export default HomePage;
