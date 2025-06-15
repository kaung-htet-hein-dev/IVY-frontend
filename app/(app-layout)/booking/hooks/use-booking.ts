import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import useBookingService from './use-booking-service';
import { useRouter } from 'next/navigation';
import { BookingRequest } from '@/types/booking';
import { ApiErrorResponse } from '@/types/api';

export const useGetServiceByID = (serviceId: string) => {
  const bookingService = useBookingService();
  const { data, error, isLoading } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => bookingService.getService(serviceId),
  });

  return {
    service: data,
    isLoading,
    error,
  };
};

export const useGetBranches = (serviceID: string) => {
  const bookingService = useBookingService();
  const { data, error, isLoading } = useQuery({
    queryKey: ['branches', serviceID],
    queryFn: () => bookingService.getBranches({ service_id: serviceID }),
  });

  return {
    branches: data,
    isLoading,
    error,
  };
};

export const useGetAvailableTimeSlots = ({
  branchID,
  bookedDate,
}: {
  branchID?: string;
  bookedDate?: string;
}) => {
  const bookingService = useBookingService();
  const { data, error, isLoading } = useQuery({
    queryKey: ['availableTimeSlots', branchID, bookedDate],
    queryFn: () =>
      bookingService.getAvailableTimeSlots({ branch_id: branchID, booked_date: bookedDate }),
    enabled: !!branchID && !!bookedDate,
  });

  return {
    availableTimeSlots: data,
    isLoading,
    error,
  };
};

export const useCreateBooking = () => {
  const bookingService = useBookingService();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (bookingData: BookingRequest) => bookingService.createBooking(bookingData),
    onSuccess: data => {
      toast({
        title: 'Success',
        description: 'Your booking has been confirmed!',
      });

      router.replace('/booking/success');
    },
    onError: (error: ApiErrorResponse) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
