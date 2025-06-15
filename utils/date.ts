import { format } from 'date-fns';

export const formatBookingDate = (date?: Date): string => {
  if (!date) return '';
  return format(new Date(date), 'dd/MM/yyyy');
};
