import axios from 'axios';

import type { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export const setApiBaseUrl = (baseUrl?: string) => {
  if (!baseUrl) {
    return;
  }
  http.defaults.baseURL = baseUrl;
};

export const httpClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await http.request<T>(config);
  return response.data;
};
