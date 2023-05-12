import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.nbp.pl/api/",
  timeout: 5000,
  headers: { Accept: "application/json" },
});

export default instance;
