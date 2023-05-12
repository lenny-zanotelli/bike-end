import axios from 'axios';
import { getUserDataFromLocalStorage } from './login';

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use((config) => {
  const userData = getUserDataFromLocalStorage();

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = userData ? `Bearer ${userData.token}` : null;
  return config;
});
