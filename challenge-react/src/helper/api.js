import axios from 'axios';

const PROXY_API_SERVER = 'api';

const axiosInstance = axios.create({
  baseURL: PROXY_API_SERVER,
  timeout: 10000,
});

export const API = {
  GET: (url, config) => {
    return axiosInstance.get(url, config);
  },
  POST: (url, data, config) => {
    return axiosInstance.post(url, data, config);
  },
};
