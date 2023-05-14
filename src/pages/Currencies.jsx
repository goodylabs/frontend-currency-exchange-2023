import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CurrenciesTable from '../components/CurrenciesTable';
import api from '../services/api';

const Currencies = () => {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  const date = tableData ? dayjs(tableData.effectiveDate).format('DD.MM.YYYY') : null;

  useEffect(() => {
    const getTableData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/exchangerates/tables/A');
        setLoading(false);
        setTableData(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getTableData();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (!loading && !tableData) return <p>Coś poszło nie tak</p>;

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Waluty</h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">Data publikacji</span>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-indigo-500">{date}</h2>
      <div className="mt-12 rounded-2xl bg-zinc-100 p-8">
        <CurrenciesTable data={tableData} />
      </div>
    </>
  );
};

export default Currencies;
