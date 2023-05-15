import React, { useState, useEffect } from "react";
import "./CurrencyTable.css";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          "https://api.nbp.pl/api/exchangerates/tables/A/"
        );
        const data = await response.json();
        setCurrencyData(data[0].rates);
        setCurrentDate(data[0].effectiveDate);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <div className="currency-table-container">
      <h2>Tabela kursów walut</h2>
      <p>Aktualna data: {currentDate}</p>
      <table className="currency-table">
        <thead>
          <tr>
            <th>Waluta</th>
            <th>Kod</th>
            <th>Kurs średni</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.map((currency) => (
            <tr key={currency.code}>
              <td>{currency.currency}</td>
              <td>{currency.code}</td>
              <td>{currency.mid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
