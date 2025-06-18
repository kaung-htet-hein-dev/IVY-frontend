import { useQuery } from '@tanstack/react-query';
import { BookingStatus } from '@/types/booking';
import useBookingService from '../booking/use-booking-service';

export const useUpcomingBooking = () => {
  const bookingService = useBookingService();

  return useQuery({
    queryKey: ['upcomingBookings'],
    queryFn: async () => {
      const data = await bookingService.getBookings({
        status: `${BookingStatus.PENDING},${BookingStatus.CONFIRMED}`,
      });
      console.log('Upcoming bookings:', data);
      return data || [];
    },
  });
};

export const usePastBooking = () => {
  const bookingService = useBookingService();

  return useQuery({
    queryKey: ['pastBookings'],
    queryFn: async () => {
      const data = await bookingService.getBookings({
        status: `${BookingStatus.CANCELLED},${BookingStatus.COMPLETED}`,
      });
      return data || [];
    },
  });
};
