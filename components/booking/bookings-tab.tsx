import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingCard } from './booking-card';
import { EmptyBookingState } from './empty-booking-state';
import { getServiceById } from '@/utils/data';
import { Booking } from '@/types/booking';

interface BookingsTabProps {
  upcomingBookings: Booking[] | null;
  pastBookings: Booking[] | null;
}

export function BookingsTab({ upcomingBookings = [], pastBookings = [] }: BookingsTabProps) {
  return (
    <Tabs defaultValue="upcoming" className="mb-8">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past & Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        {upcomingBookings && upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                service={getServiceById(booking.service.id!)}
              />
            ))}
          </div>
        ) : (
          <EmptyBookingState type="upcoming" />
        )}
      </TabsContent>

      <TabsContent value="past">
        {pastBookings && pastBookings.length > 0 ? (
          <div className="space-y-4">
            {pastBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                service={getServiceById(booking.service.id!)}
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
