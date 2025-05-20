import { apiReducer } from '../base-api';
import { endpoints } from '../endpoints';
import { ApiResponseType } from '../types';
import { Branch } from './types';

export const branchApi = apiReducer.injectEndpoints({
  endpoints: builder => ({
    getBranches: builder.query<ApiResponseType<Branch[]>, void>({
      query: () => ({
        url: endpoints.getBranches,
        method: 'GET',
      }),
    }),

    getBranchById: builder.query<ApiResponseType<Branch>, string>({
      query: id => ({
        url: endpoints.getBranchById(id),
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchesQuery, useGetBranchByIdQuery } = branchApi;
