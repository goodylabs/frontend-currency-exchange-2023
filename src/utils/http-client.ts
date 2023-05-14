import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "https://api.nbp.pl/api",
  headers: {
    Accept: "application/json",
  },
});

export async function request<Response>(cfg: AxiosRequestConfig) {
  const { data } = await client.request<Response>(cfg);
  return data;
}
