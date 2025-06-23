import { BookingStep, CustomerInfo } from '@/app/(app-layout)/booking/types';
import { useToast } from '@/hooks/util/use-toast';
import { BookingRequest } from '@/types/booking';
import { Service } from '@/types/service';
import { useParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useCreateBooking, useGetServiceByID } from '../hooks/booking/use-booking';
import { format } from 'date-fns';

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
  setSelectedBranchId: (branchID: string | undefined) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  handleDateTimeSelect: (date: Date | undefined, time: string | undefined) => void;
  handleCustomerInfoSubmit: (info: CustomerInfo) => void;
  handleConfirmBooking: () => Promise<void>;
  goBack: () => void;
  isLoading: boolean;
  serviceID: string;
  isCreating: boolean;
  isBookingSuccess: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const { isLoading, service } = useGetServiceByID(params.id);

  const [step, setStep] = useState(BookingStep.DATETIME);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedBranchId, setSelectedBranchId] = useState<string>();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const { mutate: createBooking, isPending, isSuccess: isBookingSuccess } = useCreateBooking();

  console.log('isBookingSuccess', isBookingSuccess);

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

    const bookingData: BookingRequest = {
      booked_date: format(selectedDate, 'dd/MM/yyyy'),
      booked_time: selectedTime,
      branch_id: selectedBranchId!,
      service_id: service.id,
      note: customerInfo.notes,
    };

    createBooking(bookingData);
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
    handleDateTimeSelect,
    handleCustomerInfoSubmit,
    handleConfirmBooking,
    goBack,
    isLoading,
    serviceID: params.id,
    isCreating: isPending,
    isBookingSuccess,
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
