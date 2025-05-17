'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/utils/data';
import BookingDateTime from '@/components/booking/booking-datetime';
import BookingCustomerInfo from '@/components/booking/booking-customer-info';
import BookingConfirmation from '@/components/booking/booking-confirmation';
import AuthDialog from '@/components/auth/auth-dialog';
import { useAuth } from '@/store/auth/use-auth';

// Define booking steps
const STEPS = {
  DATETIME: 0,
  CUSTOMER_INFO: 1,
  CONFIRMATION: 2,
};

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // State
  const [service, setService] = useState<any | null>(null);
  const [step, setStep] = useState(STEPS.DATETIME);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  // Load service data
  useEffect(() => {
    const serviceId = params.id as string;
    const foundService = services.find(s => s.id === serviceId);
    if (foundService) {
      setService(foundService);
    }
  }, [params.id]);

  // Check authentication when component mounts
  useEffect(() => {
    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
    }
  }, [isLoggedIn]);

  // Handle moving to next step
  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  // Handle moving to previous step
  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  // Handle date and time selection
  const handleDateTimeSelect = (date: Date | undefined, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
    nextStep();
  };

  // Handle customer info submission
  const handleCustomerInfoSubmit = (info: typeof customerInfo) => {
    setCustomerInfo(info);
    nextStep();
  };

  // Calculate the page title based on current step
  const getStepTitle = () => {
    switch (step) {
      case STEPS.DATETIME:
        return 'Choose Date & Time';
      case STEPS.CUSTOMER_INFO:
        return 'Your Information';
      case STEPS.CONFIRMATION:
        return 'Confirm Your Booking';
      default:
        return 'Book Your Appointment';
    }
  };

  if (!service) {
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
            <p className="text-xl font-semibold text-rose-600 mb-2">{service.name}</p>
            <p className="text-gray-600">
              {step < STEPS.CONFIRMATION
                ? 'Complete the form below to book your appointment'
                : 'Review and confirm your appointment details'}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between">
              {Object.keys(STEPS)
                .filter(key => !isNaN(Number(key)))
                .map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`rounded-full h-10 w-10 flex items-center justify-center border-2 
                      ${
                        Number(index) < step
                          ? 'bg-rose-500 border-rose-500 text-white'
                          : Number(index) === step
                            ? 'border-rose-500 text-rose-500'
                            : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {Number(index) < step ? '✓' : index + 1}
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {index === 0 ? 'Date & Time' : index === 1 ? 'Details' : 'Confirm'}
                    </div>
                  </div>
                ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="absolute inset-0 flex items-center">
                <div
                  className="h-1 bg-rose-500 rounded transition-all"
                  style={{
                    width: `${(step / (Object.keys(STEPS).length - 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {step === STEPS.DATETIME && (
              <BookingDateTime
                service={service}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateTimeSelect={handleDateTimeSelect}
              />
            )}

            {step === STEPS.CUSTOMER_INFO && (
              <BookingCustomerInfo
                customerInfo={customerInfo}
                onSubmit={handleCustomerInfoSubmit}
                onBack={prevStep}
              />
            )}

            {step === STEPS.CONFIRMATION && selectedDate && selectedTime && (
              <BookingConfirmation
                service={service}
                date={selectedDate}
                time={selectedTime}
                customerInfo={customerInfo}
                onConfirm={() => {}}
                onBack={prevStep}
              />
            )}
          </div>
        </div>
      </div>

      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </div>
  );
}
