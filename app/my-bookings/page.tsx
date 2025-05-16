'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { userBookings, getServiceById } from '@/lib/data';
import { format, isAfter, parseISO } from 'date-fns';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(userBookings);

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

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your upcoming and past appointments</p>
          </div>

          {/* Booking Tabs */}
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past & Completed</TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map(booking => {
                    const service = getServiceById(booking.serviceId);

                    return (
                      <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-rose-500 text-white p-4 md:p-6 md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start">
                              <div className="flex items-center md:mb-4">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span className="font-semibold">
                                  {format(new Date(booking.date), 'MMM d, yyyy')}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>{booking.timeSlot}</span>
                              </div>
                            </div>
                            <div className="p-4 md:p-6 md:flex-1">
                              <h3 className="font-semibold text-lg mb-1">
                                {service?.name || 'Service'}
                              </h3>
                              <p className="text-gray-500 text-sm mb-4">
                                Duration: {service?.duration || 'N/A'} minutes
                              </p>

                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Confirmed
                                  </span>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
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
                                          Are you sure you want to cancel this appointment? This
                                          action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleCancelBooking(booking.id)}
                                          className="bg-destructive text-destructive-foreground"
                                        >
                                          Yes, Cancel
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <Link
                                    href={`/booking?service=${booking.serviceId}`}
                                    passHref
                                    className="flex-1 sm:flex-none"
                                  >
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full sm:w-auto"
                                    >
                                      Reschedule
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Appointments</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any upcoming appointments scheduled.
                  </p>
                  <Link href="/booking" passHref>
                    <Button className="bg-rose-500 hover:bg-rose-600">
                      Book an Appointment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past">
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map(booking => {
                    const service = getServiceById(booking.serviceId);

                    return (
                      <Card key={booking.id} className="overflow-hidden opacity-80">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-gray-700 text-white p-4 md:p-6 md:w-1/4 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start">
                              <div className="flex items-center md:mb-4">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span className="font-semibold">
                                  {format(new Date(booking.date), 'MMM d, yyyy')}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>{booking.timeSlot}</span>
                              </div>
                            </div>
                            <div className="p-4 md:p-6 md:flex-1">
                              <h3 className="font-semibold text-lg mb-1">
                                {service?.name || 'Service'}
                              </h3>
                              <p className="text-gray-500 text-sm mb-4">
                                Duration: {service?.duration || 'N/A'} minutes
                              </p>

                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                    {booking.status === 'completed' ? 'Completed' : 'Past'}
                                  </span>
                                </div>
                                <Link href={`/booking?service=${booking.serviceId}`} passHref>
                                  <Button variant="outline" size="sm">
                                    Book Again
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">No Past Appointments</h3>
                  <p className="text-gray-600">You don't have any past appointment history yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="text-center">
            <Link href="/booking" passHref>
              <Button className="bg-rose-500 hover:bg-rose-600">
                Book a New Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
