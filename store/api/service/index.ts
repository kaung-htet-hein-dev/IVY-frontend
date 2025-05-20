import { apiReducer } from '../base-api';
import { endpoints } from '../endpoints';
import { ApiResponseType } from '../types';
import { Service, AvailableTimeSlotsRequest } from './types';

export const serviceApi = apiReducer.injectEndpoints({
  endpoints: builder => ({
    getServices: builder.query<ApiResponseType<Service[]>, void>({
      query: () => ({
        url: endpoints.getServices,
        method: 'GET',
      }),
    }),

    getServiceById: builder.query<ApiResponseType<Service>, string>({
      query: id => ({
        url: endpoints.getServiceById(id),
        method: 'GET',
      }),
    }),

    createService: builder.mutation<ApiResponseType<Service>, Partial<Service>>({
      query: newService => ({
        url: endpoints.createService,
        method: 'POST',
        data: newService,
      }),
    }),

    updateService: builder.mutation<
      ApiResponseType<Service>,
      { id: string; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: endpoints.updateService(id),
        method: 'PUT',
        data,
      }),
    }),

    deleteService: builder.mutation<void, string>({
      query: id => ({
        url: endpoints.deleteService(id),
        method: 'DELETE',
      }),
    }),

    getAvailableTimeSlots: builder.mutation<ApiResponseType<string[]>, AvailableTimeSlotsRequest>({
      query: request => ({
        url: endpoints.getAvailableTimeSlots,
        method: 'POST',
        data: request,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAvailableTimeSlotsMutation,
} = serviceApi;
