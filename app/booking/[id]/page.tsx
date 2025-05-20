'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetServiceByIdQuery } from '@/store/api/service';
import BookingDateTime from '@/components/booking/booking-datetime';
import BookingCustomerInfo from '@/components/booking/booking-customer-info';
import BookingConfirmation from '@/components/booking/booking-confirmation';
import AuthDialog from '@/components/auth/auth-dialog';
import { BookingStep } from '../types';
import { useAuth } from '@/store/auth/use-auth';
import { useToast } from '@/hooks/use-toast';
import { StepCounter } from '@/components/ui/step-counter';
import { BookingProvider, useBooking } from '@/providers/booking-context';

function BookingPageContent() {
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const { data: serviceResponse, isLoading: isLoadingService } = useGetServiceByIdQuery(
    params.id as string
  );

  const { step, selectedDate, selectedTime, service, setService } = useBooking();

  // Show auth dialog for non-logged in users
  useEffect(() => {
    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
    }
  }, [isLoggedIn]);

  // Set service when data is loaded
  useEffect(() => {
    if (serviceResponse?.data) {
      setService(serviceResponse.data);
    }
  }, [serviceResponse?.data, setService]);

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

  if (isLoadingService) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Loading service...</h1>
        </div>
      </div>
    );
  }

  if (!serviceResponse?.data) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Service not found</h1>
        </div>
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

      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
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
