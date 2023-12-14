// import axios from 'axios';

// const getToken = async () => {
//   const tokenWithoutQuotes = await localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1');
//   return tokenWithoutQuotes;
// };
// // eslint-disable-next-line import/prefer-default-export
// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_PRIVATE_API_URL,
//   headers: {
//     Authorization: `Bearer ${getToken()}`,
//   },
// });

import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URL,
});

async function getToken() {
  const tokenWithoutQuotes = await localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1');
  return tokenWithoutQuotes;
}

axiosInstance.interceptors.request.use(async (config) => {
  const tokenWithoutQuotes = await getToken();
  const updatedConfig = { ...config }; // Créer une copie de l'objet config
  updatedConfig.headers.Authorization = `Bearer ${tokenWithoutQuotes}`;
  return updatedConfig;
});
