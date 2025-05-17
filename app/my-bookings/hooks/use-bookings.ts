import { useState } from 'react';
import { isAfter } from 'date-fns';
import { userBookings } from '@/utils/data';

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  serviceId: string;
  status: string;
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(userBookings);

  // Filter bookings by status
  const upcomingBookings = bookings.filter(
    booking => booking.status === 'confirmed' && isAfter(new Date(booking.date), new Date())
  );

  const pastBookings = bookings.filter(
    booking =>
      booking.status === 'completed' ||
      (booking.status === 'confirmed' && !isAfter(new Date(booking.date), new Date()))
  );

  // Handle booking cancellation
  const handleCancelBooking = (bookingId: string) => {
    setBookings(
      bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
  };

  return {
    upcomingBookings,
    pastBookings,
    handleCancelBooking,
  };
}
