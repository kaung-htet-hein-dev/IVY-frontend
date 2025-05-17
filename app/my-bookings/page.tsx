'use client';

import { BookingsTab } from '@/components/booking/bookings-tab';
import { PageHeader } from '@/components/ui/page-header';
import { useBookings } from './hooks/use-bookings';

export default function MyBookingsPage() {
  const { upcomingBookings, pastBookings, handleCancelBooking } = useBookings();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="My Bookings"
            description="View and manage your upcoming and past appointments"
          />

          <BookingsTab
            upcomingBookings={upcomingBookings}
            pastBookings={pastBookings}
            onCancelBooking={handleCancelBooking}
          />
        </div>
      </div>
    </div>
  );
}
