import axios from 'axios';

import type { AxiosRequestConfig } from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.VITE_APP_USE_PROXY === 'true') {
    return '/api';
  }
  return import.meta.env.VITE_APP_LOCAL_URL;
};

const http = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export const httpClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await http.request<T>(config);
  return response.data;
};
