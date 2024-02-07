import axios from 'axios';

// todo: bsaeURL은 추후 환경변수로 빼야함 [24/02/07]
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// todo: token 관련 처리는 추후 추가해야함 [24/02/07]
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error),
);
