import { BASE_URL } from '@/api/endpoints';
import { ApiErrorResponse } from '@/types/api';
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

export const createAxiosInstance = (
  getToken: () => Promise<string | null>,
  onAuthError: () => void
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getToken();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    (error: ApiErrorResponse) => {
      if (error.response?.status === 401) {
        onAuthError();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
