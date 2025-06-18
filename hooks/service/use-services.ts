import { Service } from '@/store/api/service/types';
import { useGetServicesQuery } from '@/store/api/service';

export function useServices() {
  const { data: response, isLoading } = useGetServicesQuery();

  // Group services by category
  const categorizedServices =
    response?.data?.reduce<Record<string, Service[]>>((acc, service) => {
      const category = service.category.name || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {}) || {};

  return {
    services: response?.data || [],
    categorizedServices,
    isLoading,
  };
}
