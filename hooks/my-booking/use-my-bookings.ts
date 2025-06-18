import { useQuery } from '@tanstack/react-query';
import useBookingService from './booking/use-booking-service';
import { BookingStatus } from '@/types/booking';

export const useUpcomingBooking = () => {
  const bookingService = useBookingService();

  return useQuery({
    queryKey: ['upcomingBookings'],
    queryFn: async () => {
      const { data } = await bookingService.getBookings({
        status: `${BookingStatus.PENDING},${BookingStatus.CONFIRMED}`,
      });
      return data?.data || [];
    },
  });
};

export const usePastBooking = () => {
  const bookingService = useBookingService();

  return useQuery({
    queryKey: ['pastBookings'],
    queryFn: async () => {
      const { data } = await bookingService.getBookings({
        status: `${BookingStatus.CANCELLED},${BookingStatus.COMPLETED}`,
      });
      return data?.data || [];
    },
  });
};
