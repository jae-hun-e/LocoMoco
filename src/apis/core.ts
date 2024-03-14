import { getItem } from '@/utils/storage';
import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.params) {
      const paramsValues = Object.values(config.params);
      for (const value of paramsValues) {
        if (Array.isArray(value)) {
          config.paramsSerializer = {
            encode: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
          };
          break;
        }
      }
    }

    if (typeof window !== 'undefined') {

      const token = getItem<string>(localStorage, 'token');
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    }
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

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  <T>(config: AxiosRequestConfig): Promise<T> => {
    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
} as const;

const client = {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};

export default client;
