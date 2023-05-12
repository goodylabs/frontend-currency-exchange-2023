import { useEffect, useState } from "react";
import api from "./services/api";

const getTableData = async () => {
  try {
    const res = await api.get("/exchangerates/tables/A");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentGoldPrice = async () => {
  try {
    const res = await api.get("/cenyzlota");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

function App() {
  const [tableData, setTableData] = useState();
  const [currentGoldData, setCurrentGoldData] = useState();

  useEffect(() => {
    const getData = async () => {
      const tData = await getTableData();
      const gData = await getCurrentGoldPrice();

      setTableData(tData[0]);
      setCurrentGoldData(gData[0]);
    };
    getData();
  }, []);

  if (!tableData || !currentGoldData) return <p>Loading</p>;

  return (
    <div>
      {/* tabela A */}
      <p>Effective date: {tableData.effectiveDate}</p>
      <p>No: {tableData.no}</p>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Mid
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.rates.map((rate) => (
            <tr
              key={rate.code}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {rate.currency}
              </th>
              <td className="px-6 py-4">{rate.code}</td>
              <td className="px-6 py-4">{rate.mid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Aktualna cena złota */}
      <p>Aktualna cena złota {currentGoldData.cena}</p>
    </div>
  );
}

export default App;
