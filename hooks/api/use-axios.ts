import { useAuth, useClerk } from '@clerk/nextjs';
import { useCallback, useMemo } from 'react';
import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '@/lib/axios/axios';

// Singleton axios instance for memory efficiency
let globalAxiosInstance: AxiosInstance | null = null;

const useAxios = () => {
  const { getToken } = useAuth();
  const { signOut } = useClerk();

  const handleAuthError = useCallback(() => {
    signOut();
    window.location.href = '/sign-in';
  }, [signOut]);

  const getTokenWrapper = useCallback(async () => {
    try {
      const token = await getToken();
      return token || null;
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  }, [getToken]);

  const axiosInstance = useMemo(() => {
    if (!globalAxiosInstance) {
      globalAxiosInstance = createAxiosInstance(getTokenWrapper, handleAuthError);
    }
    return globalAxiosInstance;
  }, [getTokenWrapper, handleAuthError]);

  return { axiosInstance };
};

export default useAxios;
