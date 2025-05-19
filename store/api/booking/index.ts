import { apiReducer } from '../base-api';
import { endpoints } from '../endpoints';
import { ApiResponseType } from '../types';
import { Booking } from './types';

export const bookingApi = apiReducer.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query<ApiResponseType<Booking[]>, void>({
      query: () => ({
        url: endpoints.getBookings,
        method: 'GET',
      }),
    }),

    getBookingById: builder.query<ApiResponseType<Booking>, string>({
      query: id => ({
        url: endpoints.getBookingById(id),
        method: 'GET',
      }),
    }),

    createBooking: builder.mutation<ApiResponseType<Booking>, Partial<Booking>>({
      query: newBooking => ({
        url: endpoints.createBooking,
        method: 'POST',
        data: newBooking,
      }),
    }),

    updateBooking: builder.mutation<
      ApiResponseType<Booking>,
      { id: string; data: Partial<Booking> }
    >({
      query: ({ id, data }) => ({
        url: endpoints.updateBooking(id),
        method: 'PUT',
        data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
} = bookingApi;
