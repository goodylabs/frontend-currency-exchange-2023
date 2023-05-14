import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '../services/api';
import getHistoricalDates from '../utils/getHistoricalDates';
import priceFormatter from '../utils/priceFormatter';

const getCurrentGoldPrice = async () => {
  try {
    const res = await api.get('/cenyzlota');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getHistoricalGoldPrice = async (date) => {
  const [startDate, endDate] = getHistoricalDates(date);

  try {
    const res = await api.get(`/cenyzlota/${startDate}/${endDate}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const Gold = () => {
  const [currentGoldData, setCurrentGoldData] = useState();

  useEffect(() => {
    const currentDate = dayjs();
    const getData = async () => {
      const gData = await getCurrentGoldPrice();
      const hgData = await getHistoricalGoldPrice(currentDate);

      setCurrentGoldData(gData[0]);
      console.log(hgData);
    };
    getData();
  }, []);

  if (!currentGoldData) return <p>Loading</p>;

  return (
    <>
      <h1 className="text-5xl font-semibold tracking-wide text-zinc-900">Złoto</h1>
      <span className="mt-12 text-xl font-semibold text-zinc-900">Aktualna cena złota</span>
      <h2 className="mt-3 text-4xl font-bold tracking-wide text-indigo-500">
        {priceFormatter.format(currentGoldData.cena)}
      </h2>
      <div className="mt-12 rounded-2xl bg-zinc-100 p-8"></div>
    </>
  );
};

export default Gold;
