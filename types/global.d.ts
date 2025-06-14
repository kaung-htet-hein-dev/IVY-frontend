import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

declare global {
  interface Window {
    Clerk: {
      session: {
        getToken: () => Promise<string>;
      };
    };
  }
}

export {};
