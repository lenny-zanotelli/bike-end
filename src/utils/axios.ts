import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URL,
  headers: {
    Authorization: `Bearer ${await localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1')}`,
  },
});
