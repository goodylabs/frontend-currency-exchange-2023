import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const getTableData = async () => {
  try {
    const res = await api.get('/exchangerates/tables/A');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const Currencies = () => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    const getData = async () => {
      const Data = await getTableData();
      setTableData(Data[0]);
    };
    getData();
  }, []);

  if (!tableData) return <p>Loading</p>;

  return (
    <>
      <p>Effective date: {tableData.effectiveDate}</p>
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
            <tr key={rate.code} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <Link to={`/${rate.code}`}>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {rate.currency}
                </th>
              </Link>
              <td className="px-6 py-4">{rate.code}</td>
              <td className="px-6 py-4">{rate.mid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Currencies;
