import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUpdateBooking } from '@/hooks/use-booking';
import { Booking } from '@/types/booking';
import { Service } from '@/types/service';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface BookingCardProps {
  booking: Booking;
  service: Service | undefined;
  isPast?: boolean;
}

export function BookingCard({ booking, service, isPast = false }: BookingCardProps) {
  const { mutate } = useUpdateBooking();

  const onCancelBooking = (ID: string) => {
    mutate(ID);
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const bgColor = isPast ? 'bg-gray-700' : 'bg-rose-500';

  return (
    <Card className={`overflow-hidden ${isPast ? 'opacity-80' : ''}`}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div
            className={`${bgColor} text-white p-4 md:p-6 md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start`}
          >
            <div className="flex items-center md:mb-4">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {format(new Date(booking.created_at), 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{booking.booked_time}</span>
            </div>
          </div>
          <div className="p-4 md:p-6 md:flex-1">
            <h3 className="font-semibold text-lg mb-1">{service?.name || 'Service'}</h3>
            <p className="text-gray-500 text-sm mb-4">
              Duration: {service?.duration_minute || 'N/A'} minutes
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span
                  className={`inline-block ${getStatusColor(booking.status)} text-xs px-2 py-1 rounded-full`}
                >
                  {formatStatus(booking.status)}
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {!isPast ? (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this appointment? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onCancelBooking?.(booking.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* <Link
                      href={`/booking?service=${booking.service.id}`}
                      passHref
                      className="flex-1 sm:flex-none"
                    >
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Reschedule
                      </Button>
                    </Link> */}
                  </>
                ) : (
                  <Link href={`/booking?service=${booking.service.id}`} passHref>
                    <Button variant="outline" size="sm">
                      Book Again
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
