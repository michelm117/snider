import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  // baseURL: 'http://localhost:3333/api',
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
