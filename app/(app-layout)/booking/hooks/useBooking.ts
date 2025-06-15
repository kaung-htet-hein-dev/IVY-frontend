import { useQuery } from '@tanstack/react-query';
import useBookingService from './useBookingService';

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
