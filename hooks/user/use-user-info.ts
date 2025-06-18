import { endpoints } from '@/api/endpoints';
import { User } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../api/use-axios';

export const useUserInfo = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<User> => {
      const response = await axiosInstance.get(endpoints.userProfile);
      return response.data.data;
    },
  });
};

export const useUserMutation = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User> & { id: string }) => {
      const response = await axiosInstance.put(`${endpoints.users}/${userData.id}`, userData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currentUser'],
      });
    },
  });
};
