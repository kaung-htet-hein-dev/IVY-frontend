import { ApiResponse, Pagination } from './api';

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type CategoryResponse = ApiResponse<{
  code: number;
  data: Category[];
  message: string;
  pagination: Pagination;
}>;
