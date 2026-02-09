import axios from 'axios';

import type { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const httpClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await http.request<T>(config);
  return response.data;
};
