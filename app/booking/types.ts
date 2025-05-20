import { BookingStatus } from '@/store/api/booking/types';

export enum BookingStep {
  DATETIME = 0,
  CUSTOMER_INFO = 1,
  CONFIRMATION = 2,
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingForm {
  service: {
    id: string;
  };
  date: string;
  status: BookingStatus;
  user?: {
    id?: string;
  };
  customerInfo: CustomerInfo;
}

// Form schemas
export const customerInfoSchema = {
  name: {
    required: 'Name is required',
    min: { value: 2, message: 'Name must be at least 2 characters' },
    max: { value: 50, message: 'Name must be less than 50 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^\+?[1-9]\d{1,14}$/,
      message: 'Please enter a valid phone number (E.164 format)',
    },
  },
  notes: {
    maxLength: { value: 500, message: 'Notes must be less than 500 characters' },
  },
};
