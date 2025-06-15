import { createContext, useContext, useState, ReactNode } from 'react';
import { BookingStep, CustomerInfo, BookingForm } from '@/app/(app-layout)/booking/types';
import { BookingStatus } from '@/store/api/booking/types';
import { useCreateBookingMutation } from '@/store/api/booking';
import { useToast } from '@/hooks/use-toast';
import { Service } from '@/store/api/service/types';
import { useRouter } from 'next/navigation';

interface BookingContextType {
  step: BookingStep;
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  selectedBranchId: string | undefined;
  customerInfo: CustomerInfo;
  service: Service | undefined;
  setStep: (step: BookingStep) => void;
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedTime: (time: string | undefined) => void;
  setSelectedBranchId: (branchId: string | undefined) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setService: (service: Service) => void;
  handleDateTimeSelect: (date: Date | undefined, time: string | undefined) => void;
  handleCustomerInfoSubmit: (info: CustomerInfo) => void;
  handleConfirmBooking: () => Promise<void>;
  goBack: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [createBooking] = useCreateBookingMutation();

  const [step, setStep] = useState(BookingStep.DATETIME);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedBranchId, setSelectedBranchId] = useState<string>();
  const [service, setService] = useState<Service>();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleDateTimeSelect = (date: Date | undefined, time: string | undefined) => {
    if (!date || !time || !selectedBranchId) {
      toast({
        title: 'Error',
        description: 'Please select a branch, date, and time.',
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
    if (!selectedDate || !selectedTime || !service) {
      toast({
        title: 'Error',
        description: 'Invalid booking details. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const bookingData: BookingForm = {
        service: { id: service.id },
        branchId: selectedBranchId!,
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

  const goBack = () => setStep(prev => prev - 1);

  const value = {
    step,
    selectedDate,
    selectedTime,
    selectedBranchId,
    customerInfo,
    service,
    setStep,
    setSelectedDate,
    setSelectedTime,
    setSelectedBranchId,
    setCustomerInfo,
    setService,
    handleDateTimeSelect,
    handleCustomerInfoSubmit,
    handleConfirmBooking,
    goBack,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
