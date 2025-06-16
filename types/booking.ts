import { ApiResponse, Pagination } from './api';
import { Branch } from './branch';
import { Service } from './service';

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  branch_id: string;
  booked_date: string;
  booked_time: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  service: Service;
  branch: Branch;
  note: string;
}

export type BookingResponse = ApiResponse<{
  code: number;
  data: Booking[];
  message: string;
  pagination: Pagination;
}>;

export type TimeSlot = {
  slot: string;
  is_available: boolean;
};

export type TimeSlotResponse = ApiResponse<{
  code: number;
  data: TimeSlot[];
  message: string;
}>;

export type BookingRequest = {
  service_id: string;
  branch_id: string;
  booked_date: string;
  booked_time: string;
  note?: string;
  status?: string;
};

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}
