'use client';

import { Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useBooking } from '@/providers/booking-context';
import { useState } from 'react';
import { BookingStepNavigation } from './booking-step-navigation';
import { BookingStep } from '@/app/booking/types';

export default function BookingConfirmation() {
  const {
    service,
    selectedDate: date,
    selectedTime: time,
    customerInfo,
    handleConfirmBooking: onConfirm,
    goBack: onBack,
  } = useBooking();

  // If any required data is missing, we shouldn't show the confirmation screen
  if (!service || !date || !time) return null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formattedDate = format(date, 'MMMM d, yyyy');

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
    } catch (error) {
      // Error will be handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Please review your booking details below. If everything looks correct, click "Confirm
        Booking" to finalize your appointment.
      </p>

      <div className="space-y-6">
        {/* Service Details */}
        <div className="bg-green-50 p-4 rounded-lg border border-rose-100">
          <h3 className="font-semibold text-lg text-green-700 mb-2">Service Details</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-gray-500">Service:</p>
              <p className="font-medium">{service.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price:</p>
              <p className="font-medium">${service.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration:</p>
              <p className="font-medium">{service.durationMinute} minutes</p>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Appointment Details</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-2" />
              <span>{customerInfo.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <span>{customerInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span>{customerInfo.phone}</span>
            </div>
            {customerInfo.notes && (
              <div className="flex items-start">
                <FileText className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                <span>{customerInfo.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="text-sm text-gray-500">
          <p className="mb-2">By confirming this booking, you agree to our cancellation policy:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Free cancellation up to 24 hours before your appointment</li>
            <li>Cancellations within 24 hours may incur a fee</li>
            <li>No-shows will be charged the full service price</li>
          </ul>
        </div>

        {/* Navigation Buttons */}
        <BookingStepNavigation
          onBack={onBack}
          onNext={handleConfirm}
          nextLabel="Confirm Booking"
          isLoading={isSubmitting}
          loadingLabel="Confirming..."
          stepCount={BookingStep.CONFIRMATION}
        />
      </div>
    </div>
  );
}
