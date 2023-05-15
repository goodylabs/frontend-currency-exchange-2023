import dayjs from 'dayjs';

const getHistoricalDates = (date) => {
  const startDate = dayjs(date).subtract(2, 'week');

  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
  const formattedEndDate = dayjs(date).format('YYYY-MM-DD');

  return [formattedStartDate, formattedEndDate];
};

export default getHistoricalDates;
