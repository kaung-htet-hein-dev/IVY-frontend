import { endpoints } from '@/api/endpoints';
import useAxios from '@/hooks/api/use-axios';
import { Booking, BookingRequest, BookingResponse, TimeSlot } from '@/types/booking';
import { Branch } from '@/types/branch';
import { Service } from '@/types/service';
import { AxiosRequestConfig } from 'axios';

export const useBookingService = () => {
  const { axiosInstance } = useAxios();

  return {
    getService: async (id: string): Promise<Service> => {
      const response = await axiosInstance.get<{
        code: number;
        data: Service;
        message: string;
      }>(endpoints.service(id));
      return response.data.data;
    },

    getBranches: async (params: AxiosRequestConfig['params']): Promise<{ data: Branch[] }> => {
      const response = await axiosInstance.get<{ data: Branch[] }>(endpoints.branches, { params });
      return response.data;
    },

    getAvailableTimeSlots: async (params: AxiosRequestConfig['params']): Promise<TimeSlot[]> => {
      const response = await axiosInstance.get<{ data: TimeSlot[] }>(endpoints.availableTimeSlots, {
        params,
      });
      return response.data.data;
    },

    getBookings: async (params: AxiosRequestConfig['params']): Promise<Booking[]> => {
      const response = await axiosInstance.get<{ data: Booking[] }>(`${endpoints.bookings}`, {
        params,
      });

      return response.data.data || [];
    },

    getBooking: async (id: string): Promise<Booking> => {
      const response = await axiosInstance.get<{ data: Booking }>(endpoints.booking(id));
      return response.data.data;
    },

    createBooking: async (booking: BookingRequest): Promise<Booking> => {
      const response = await axiosInstance.post<{ data: Booking }>(endpoints.bookings, booking);
      return response.data.data;
    },

    updateBooking: async (id: string, booking: Partial<BookingRequest>): Promise<Booking> => {
      const response = await axiosInstance.put<{ data: Booking }>(endpoints.booking(id), booking);
      return response.data.data;
    },
  };
};

export default useBookingService;
