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
import { useUpdateBooking } from '@/hooks/booking/use-booking';
import { Booking } from '@/types/booking';
import { Service } from '@/types/service';
import { generateGoogleMapsUrl } from '@/utils/helpers';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
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
    <Card
      className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${isPast ? 'opacity-80' : ''}`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div
            className={`${bgColor} text-white p-6 md:w-1/3 flex flex-col justify-start space-y-4`}
          >
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-3" />
              <span className="font-medium text-sm">{booking.booked_date}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-3" />
              <span className="font-medium text-sm">{booking.booked_time}</span>
            </div>

            <div>
              <div className="flex items-center mb-2">
                {booking.branch?.latitude && booking.branch?.longitude ? (
                  <a
                    href={generateGoogleMapsUrl(
                      booking?.branch?.latitude,
                      booking?.branch?.longitude
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group hover:bg-white/10 rounded-lg px-2 py-1 -mx-2 -my-1 transition-all duration-200"
                  >
                    <MapPin className="h-4 w-4 mr-3 group-hover:scale-105 transition-transform duration-200" />
                    <span className="font-medium text-sm group-hover:text-white underline decoration-1 underline-offset-2 group-hover:no-underline">
                      {booking.branch?.name || 'Branch'}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3" />
                    <span className="font-medium text-sm">{booking.branch?.name || 'Branch'}</span>
                  </div>
                )}
              </div>
              {booking.branch?.location && (
                <div className="text-white/85 text-xs ml-7 leading-relaxed">
                  {booking.branch.location}
                </div>
              )}
            </div>

            {booking.branch?.phone_number && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <a
                  href={`tel:${booking.branch.phone_number}`}
                  className="text-white/90 hover:text-white transition-colors text-sm font-medium underline decoration-1 underline-offset-2"
                >
                  {booking.branch.phone_number}
                </a>
              </div>
            )}
          </div>

          <div className="p-6 flex-1 bg-white flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="font-bold text-xl mb-2 text-gray-900 leading-tight">
                {service?.name || 'Service'}
              </h3>
              <p className="text-gray-500 text-sm">
                Duration: {service?.duration_minute || 'N/A'} minutes
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusColor(booking.status)}`}
              >
                {formatStatus(booking.status)}
              </span>

              <div className="flex gap-3 w-full sm:w-auto">
                {!isPast ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="font-medium px-6">
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="sm:max-w-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">
                          Cancel Appointment
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 leading-relaxed text-base">
                          Are you sure you want to cancel this appointment? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="font-medium">No, Keep It</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onCancelBooking?.(booking.id)}
                          className="bg-red-600 hover:bg-red-700 font-medium"
                        >
                          Yes, Cancel
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Link href={`/booking?service=${booking.service.id}`} passHref>
                    <Button variant="outline" className="font-medium px-6">
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
