import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '../services/api';
import getHistoricalDates from '../utils/getHistoricalDates';

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
      <h1>Hello Gold</h1>
      <p>Aktualna cena złota {currentGoldData.cena}</p>
    </>
  );
};

export default Gold;
