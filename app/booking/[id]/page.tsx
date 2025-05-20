'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetServiceByIdQuery } from '@/store/api/service';
import BookingDateTime from '@/components/booking/booking-datetime';
import BookingCustomerInfo from '@/components/booking/booking-customer-info';
import BookingConfirmation from '@/components/booking/booking-confirmation';
import AuthDialog from '@/components/auth/auth-dialog';
import { BookingStep, CustomerInfo, BookingForm } from '../types';
import { useAuth } from '@/store/auth/use-auth';
import { useCreateBookingMutation } from '@/store/api/booking';
import { BookingStatus } from '@/store/api/booking/types';
import { useToast } from '@/hooks/use-toast';
import { StepCounter } from '@/components/ui/step-counter';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  // API hooks
  const { data: serviceResponse, isLoading: isLoadingService } = useGetServiceByIdQuery(
    params.id as string
  );
  const [createBooking] = useCreateBookingMutation();

  // State
  const [step, setStep] = useState(BookingStep.DATETIME);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  // Show auth dialog for non-logged in users
  useEffect(() => {
    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
    }
  }, [isLoggedIn]);

  // Form handlers
  const handleDateTimeSelect = (date: Date | undefined, time: string | undefined) => {
    if (!date || !time) {
      toast({
        title: 'Error',
        description: 'Please select both date and time.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedDate(date);
    setSelectedTime(time);
    setStep(prev => prev + 1);
  };

  const handleCustomerInfoSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setStep(prev => prev + 1);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !serviceResponse?.data) {
      toast({
        title: 'Error',
        description: 'Invalid booking details. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const bookingData: BookingForm = {
        service: { id: serviceResponse.data.id },
        date: `${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00.000Z`,
        status: BookingStatus.PENDING,
        customerInfo,
      };

      await createBooking(bookingData).unwrap();

      toast({
        title: 'Success',
        description: 'Your booking has been confirmed!',
      });

      router.push('/booking/success');
    } catch (error) {
      console.error('Failed to create booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

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

  const service = serviceResponse.data;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{getStepTitle()}</h1>
            <p className="text-xl font-semibold text-rose-600 mb-2">{service.name}</p>
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
            {step === BookingStep.DATETIME && (
              <BookingDateTime
                service={service}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateTimeSelect={handleDateTimeSelect}
              />
            )}

            {step === BookingStep.CUSTOMER_INFO && (
              <BookingCustomerInfo
                customerInfo={customerInfo}
                onSubmit={handleCustomerInfoSubmit}
                onBack={() => setStep(prev => prev - 1)}
              />
            )}

            {step === BookingStep.CONFIRMATION && selectedDate && selectedTime && (
              <BookingConfirmation
                service={service}
                date={selectedDate}
                time={selectedTime}
                customerInfo={customerInfo}
                onConfirm={handleConfirmBooking}
                onBack={() => setStep(prev => prev - 1)}
              />
            )}
          </div>
        </div>
      </div>

      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </div>
  );
}
