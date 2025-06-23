'use client';

import BookingConfirmation from '@/components/booking/booking-confirmation';
import BookingCustomerInfo from '@/components/booking/booking-customer-info';
import BookingDateTime from '@/components/booking/booking-datetime';
import { StepCounter } from '@/components/ui/step-counter';
import { LoadingState, NotFoundState } from '@/components/ui/ui-state';
import { BookingProvider, useBooking } from '@/providers/booking-context';
import { BookingStep } from '../types';
import BookingSuccess from '@/components/booking/booking-success';

function BookingPageContent() {
  const { step, selectedDate, selectedTime, service, isLoading, isBookingSuccess } = useBooking();

  const getStepTitle = () => {
    switch (step) {
      case BookingStep.DATETIME:
        return 'Choose Date & Time';
      case BookingStep.CUSTOMER_INFO:
        return 'Your Information';
      case BookingStep.CONFIRMATION:
        return 'Confirm Your Booking';
      default:
        return 'Book Your Appointment';
    }
  };

  if (isBookingSuccess) {
    return <BookingSuccess />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[100dvh]">
        <LoadingState />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center h-[100dvh]">
        <NotFoundState />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{getStepTitle()}</h1>
            <p className="text-xl font-semibold text-rose-600 mb-2">{service?.name}</p>
            <p className="text-gray-600">
              {step < BookingStep.CONFIRMATION
                ? 'Complete the form below to book your appointment'
                : 'Review and confirm your appointment details'}
            </p>
          </div>

          {/* Progress Steps */}
          <StepCounter
            currentStep={step}
            steps={[
              { label: 'Date & Time', value: BookingStep.DATETIME },
              { label: 'Details', value: BookingStep.CUSTOMER_INFO },
              { label: 'Confirm', value: BookingStep.CONFIRMATION },
            ]}
          />

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {step === BookingStep.DATETIME && <BookingDateTime />}

            {step === BookingStep.CUSTOMER_INFO && <BookingCustomerInfo />}

            {step === BookingStep.CONFIRMATION && selectedDate && selectedTime && service && (
              <BookingConfirmation />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingPageContent />
    </BookingProvider>
  );
}
