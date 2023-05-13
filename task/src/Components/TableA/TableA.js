import React, { useState, useEffect } from 'react';

const URL = "https://api.nbp.pl/api/exchangerates/tables/A?format=json";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [publishDate, setPublishDate] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCurrencyData(data[0].rates);
        setPublishDate(data[0].effectiveDate);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div>
        <div className="mx-60 ">
          {currencyData && publishDate && (
            <div>
                <div className="text-center text-5xl  text-white mb-1 stroke-black	">Current Currency Table A</div>
                <div className="text-center text-1xl text-slate-400 mb-1">Published: {publishDate}</div>
              <table className="w-full text-black">
                <tr className=" text-2xl bg-white h-16 max-h-16 text-center leading-16  items-center grid grid-cols-3 justify-center rounded-lg">
                  <th className="font-heading font-medium">Currency name</th>
                  <th className="font-medium">Currency code</th>
                  <th className="font-medium">Average exchange rate</th>
                </tr>
                
                {currencyData.map((currency) => (
                  <tr className="w-full grid grid-cols-3 text-xl h-12 max-h-12 text-center leading-12 justify-center rounded-lg " key={currency.code}>
                    <td className="border-2 border-back rounded-lg bg-white">{currency.currency}</td>
                    <td  className="border-2 border-back rounded-lg bg-white">{currency.code}</td>
                    <td className="border-2 border-back rounded-lg bg-white">{currency.mid}</td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrencyTable;
