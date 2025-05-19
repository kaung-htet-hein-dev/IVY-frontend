import { Service } from '../service/types';
import { User } from '../user/types';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export interface Booking {
  id: string;
  service: Partial<Service>;
  user: Partial<User>;
  date: string;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}
