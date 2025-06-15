import { endpoints } from '@/api/endpoints';
import useAxios from '@/hooks/use-axios';
import { Booking, BookingResponse, TimeSlot } from '@/types/booking';
import { Branch } from '@/types/branch';
import { Service } from '@/types/service';
import { AxiosRequestConfig } from 'axios';
import { format } from 'date-fns';

interface GetBookingsFilters {
  status?: string;
  booked_date?: string;
}

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

    getBookings: async (
      options: {
        pageIndex: number;
        pageSize: number;
      } = { pageIndex: 0, pageSize: 10 },
      filters?: GetBookingsFilters
    ): Promise<BookingResponse> => {
      const response = await axiosInstance.get<BookingResponse>(`${endpoints.bookings}`, {
        params: {
          offset: options.pageIndex * options.pageSize,
          limit: options.pageSize,
          status: filters?.status,
          booked_date: filters?.booked_date,
        },
      });

      return response.data;
    },

    getBooking: async (id: string): Promise<Booking> => {
      const response = await axiosInstance.get<{ data: Booking }>(endpoints.booking(id));
      return response.data.data;
    },

    getAvailableSlots: async (date: string, branchID: string): Promise<TimeSlot[]> => {
      const response = await axiosInstance.get<{ data: TimeSlot[] }>(
        `${endpoints.bookings}/slots?booked_date=${date}&branch_id=${branchID}`
      );
      return response.data.data;
    },

    createBooking: async (booking: any): Promise<Booking> => {
      const formattedBooking = {
        ...booking,
        booked_date: format(booking.booked_date, 'dd/MM/yyyy'),
      };
      const response = await axiosInstance.post<{ data: Booking }>(
        endpoints.bookings,
        formattedBooking
      );
      return response.data.data;
    },

    updateBookingStatus: async (id: string, status: string): Promise<Booking> => {
      const response = await axiosInstance.put<{ data: Booking }>(endpoints.booking(id), {
        status,
      });
      return response.data.data;
    },
  };
};

export default useBookingService;
