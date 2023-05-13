import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import api from '../services/api';

const getCurrentGoldPrice = async () => {
  try {
    const res = await api.get('/cenyzlota');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getHistoricalGoldPrice = async (endDate) => {
  const startDate = dayjs(endDate).subtract(2, 'week');
  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
  const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

  try {
    const res = await api.get(`/cenyzlota/${formattedStartDate}/${formattedEndDate}`);
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
