import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.nbp.pl/api/',
  timeout: 5000,
  headers: { Accept: 'application/json' },
});

export default api;
