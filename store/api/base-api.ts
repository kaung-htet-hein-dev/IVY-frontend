import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosHeaders, Method } from 'axios';
import axiosInstance from './base-client';

interface BaseQueryApi {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  headers?: AxiosHeaders;
}

export interface ApiError {
  status?: number;
  data?: any;
  message?: string;
}

const baseApiQuery =
  () =>
  async ({ url, method, data, params, headers }: BaseQueryApi) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        } as ApiError,
      };
    }
  };

export const apiReducer = createApi({
  reducerPath: 'api',
  baseQuery: baseApiQuery(),
  endpoints: () => ({}),
  keepUnusedDataFor: 5 * 60, // 5 minutes
});
