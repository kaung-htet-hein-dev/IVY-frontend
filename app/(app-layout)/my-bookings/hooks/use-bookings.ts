import { isAfter } from 'date-fns';
import { BookingStatus } from '@/store/api/booking/types';
import { useGetBookingsQuery, useUpdateBookingMutation } from '@/store/api/booking';

export function useBookings() {
  const { data: response, isLoading } = useGetBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();

  // Filter bookings by status
  const upcomingBookings =
    response?.data?.filter(
      booking =>
        booking.status === BookingStatus.CONFIRMED && isAfter(new Date(booking.date), new Date())
    ) ?? [];

  const pastBookings =
    response?.data?.filter(
      booking =>
        booking.status === BookingStatus.COMPLETED ||
        (booking.status === BookingStatus.CONFIRMED && !isAfter(new Date(booking.date), new Date()))
    ) ?? [];

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await updateBooking({
        id: bookingId,
        data: { status: BookingStatus.CANCELLED },
      });
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  return {
    upcomingBookings,
    pastBookings,
    handleCancelBooking,
    isLoading,
  };
}
