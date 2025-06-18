'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingCard } from './booking-card';
import { EmptyBookingState } from './empty-booking-state';
import { usePastBooking, useUpcomingBooking } from '@/hooks/my-booking/use-my-bookings';

export function BookingsTab() {
  const { data: upcomingBookings = [] } = useUpcomingBooking();
  const { data: pastBookings = [] } = usePastBooking();

  return (
    <Tabs defaultValue="upcoming" className="mb-8">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past & Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        {upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} service={booking.service} />
            ))}
          </div>
        ) : (
          <EmptyBookingState type="upcoming" />
        )}
      </TabsContent>

      <TabsContent value="past">
        {pastBookings.length > 0 ? (
          <div className="space-y-4">
            {pastBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                service={booking.service}
                isPast={true}
              />
            ))}
          </div>
        ) : (
          <EmptyBookingState type="past" />
        )}
      </TabsContent>
    </Tabs>
  );
}
