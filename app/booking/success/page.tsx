'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Calendar, Clock, User } from 'lucide-react';
import { getServiceById } from '@/lib/data';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const [serviceName, setServiceName] = useState<string>('');

  // Extract booking details from URL parameters
  const bookingId = searchParams.get('id');
  const serviceId = searchParams.get('service');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const customerName = searchParams.get('name');

  // Format date for display
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Look up service details
  useEffect(() => {
    if (serviceId) {
      const service = getServiceById(serviceId);
      if (service) {
        setServiceName(service.name);
      }
    }
  }, [serviceId]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-md border-0">
            <CardContent className="pt-6 px-6 pb-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
                <p className="text-gray-600">
                  Your appointment has been successfully booked. We've sent a confirmation to your
                  email.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-lg mb-4 text-gray-800">Appointment Details</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-rose-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-rose-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{time}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User className="h-5 w-5 text-rose-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{serviceName}</p>
                    </div>
                  </div>
                </div>

                {bookingId && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Booking Reference</p>
                    <p className="font-mono text-sm">{bookingId}</p>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-600 mb-8">
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>You'll receive a confirmation email shortly</li>
                  <li>We'll send a reminder 24 hours before your appointment</li>
                  <li>Please arrive 5-10 minutes before your scheduled time</li>
                  <li>
                    If you need to cancel or reschedule, please contact us at least 24 hours in
                    advance
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/" passHref className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
                  </Button>
                </Link>
                <Link href="/my-bookings" passHref className="flex-1">
                  <Button className="w-full bg-rose-500 hover:bg-rose-600">View My Bookings</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
