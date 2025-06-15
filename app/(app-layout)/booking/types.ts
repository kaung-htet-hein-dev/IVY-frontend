import { BookingStatus } from '@/store/api/booking/types';
import { z } from 'zod';

export enum BookingStep {
  DATETIME = 0,
  CUSTOMER_INFO = 1,
  CONFIRMATION = 2,
}

// Form schemas
export const customerInfoSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z
    .string()
    .regex(/^(09\d{9})$/, 'Phone number must start with 09 and be 11 digits long')
    .min(9, 'Phone number is required'),
  notes: z.string().max(100, 'Notes cannot exceed 100 characters').optional(),
});

export type CustomerInfo = z.infer<typeof customerInfoSchema>;

export interface BookingForm {
  service: {
    id: string;
  };
  branchID: string;
  date: string;
  status: BookingStatus;
  user?: {
    id?: string;
  };
  customerInfo: CustomerInfo;
}
