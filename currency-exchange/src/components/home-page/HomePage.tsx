import { useEffect, useState } from "react";
import CurrencyCard from "../currency-card/CurrencyCard";
import axios from "axios";
import { Currency, CurrencyContext } from "./CurrencyContext";

const HomePage = () => {
  const [currencyData, setCurrencyData] = useState<Currency[] | null>(null);
  const [currencyTableDate, setCurrencyTableDate] = useState("");
  const [currencyGetError, setCurrencyGetError] = useState(false);

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = async () => {
    try {
      const response = await axios.get(
        "http://api.nbp.pl/api/exchangerates/tables/a/"
      );
      setCurrencyData(response.data[0].rates);
      setCurrencyTableDate(response.data[0].effectiveDate);
    } catch (error) {
      setCurrencyGetError(true);
      console.log(error);
    }
  };

  return (
    <div>
      <CurrencyContext.Provider
        value={{ currencyData, currencyTableDate, currencyGetError }}
      >
        <CurrencyCard />
      </CurrencyContext.Provider>
    </div>
  );
};

export default HomePage;
