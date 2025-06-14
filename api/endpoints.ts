export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  services: '/api/v1/service',
  branches: '/api/v1/branch?limit=2&offset=0',
};
