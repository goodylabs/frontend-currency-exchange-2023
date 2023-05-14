import axios from "axios";
import moment from 'moment';
import * as api from './api';
import { currencyUrl} from "./routes";

export const getAllCurrencies = () => {
  return api.get(currencyUrl());
};

export const getCurrencyByCode = (code) => {
  const url = currencyUrl(code);
  return api.get(url);
};

export const getPublicationDate = (code) => {
  const url = currencyUrl(code);
  return api.get(url);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getPastDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
};

export const getGoldPrices = async () => {
  const endDate = formatDate(new Date());
  const startDate = getPastDate(14);

  try {
    const response = await axios.get(
      `http://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch gold prices");
  }
};

export const getHistoricalRates = async (currencyCode) => {
  const endDate = moment().format('YYYY-MM-DD');
  const startDate = moment().subtract(14, 'days').format('YYYY-MM-DD');
  const endpoint = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=EUR&symbols=${currencyCode}`;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch historical rates');
  }
};

export const getCurrencyByDate = async (table, code, date) => {
    try {
      const response = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${date}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch currency for date ${date}`);
    }
  };
  