import { ApiResponse, Pagination } from './api';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  role: 'ADMIN' | 'USER';
  verified: boolean;
  gender: string;
  birthday: string;
}

export type UsersResponse = ApiResponse<{
  code: number;
  data: User[];
  message: string;
  pagination: Pagination;
}>;
