import React, { useEffect, useState } from "react";
import "./CurrencyTable.css";

const CurrencyTable = () => {
  // State variables
  const [currencyData, setCurrencyData] = useState(null); // Holds the currency data
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Holds the window width

  // Fetch currency data and update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nbp.pl/api/exchangerates/tables/A/"
        );
        if (!response.ok) {
          throw new Error("Wystąpił błąd sieciowy.");
        }
        const data = await response.json();
        const currencyData = data[0];
        const publicationDate = currencyData.effectiveDate;
        const rates = currencyData.rates;

        setCurrencyData({ publicationDate, rates });
      } catch (error) {
        console.log("Wystąpił błąd:", error);
      }
    };

    fetchData();

    // Update window width state on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render loading message if currency data is not available yet
  if (!currencyData) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  // Determine if the current view is mobile based on window width
  const isMobile = windowWidth < 500;

  return (
    <>
      <h2 className="c-currency-table__header">Tabela Kursów Walut</h2>
      <p className="c-currency-table__publication-date">
        Data Publikacji: {currencyData.publicationDate}
      </p>

      <table>
        <thead>
          <tr>
            <th>{isMobile ? "Waluta" : "Nazwa Waluty"}</th>
            <th>{isMobile ? "Kod" : "Kod Waluty"}</th>
            <th>{isMobile ? "Kurs" : "Kurs Średni"}</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.rates.map((rate) => (
            <tr key={rate.code}>
              <td>{rate.currency}</td>
              <td>{rate.code}</td>
              <td>{rate.mid.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CurrencyTable;
