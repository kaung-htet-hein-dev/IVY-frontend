import { BASE_URL, endpoints } from '@/api/endpoints';
import { Branch } from '@/types/branch';
import { Service } from '@/types/service';

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

// Extended response for services with categorization
export interface ServicesApiResponse extends ApiResponse<Service[]> {
  categorizedServices?: Record<string, Service[]> | null;
}

// Generic fetcher function
export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      cache: 'force-cache',
      next: { revalidate: 1200 },
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        data: null,
        error: new Error(`Failed to fetch: ${errorData.message || res.statusText}`),
      };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
}

// Specific service fetchers
export async function getServices(): Promise<ServicesApiResponse> {
  const result = await fetcher<{ data: Service[] }>(endpoints.services);

  if (result.error) {
    return { data: null, error: result.error };
  }

  if (!result.data?.data || !Array.isArray(result.data.data)) {
    return {
      categorizedServices: null,
      data: null,
      error: new Error('Invalid response format: expected array in data field'),
    };
  }

  const categorizedServices =
    result?.data?.data?.reduce<Record<string, Service[]>>((acc, service) => {
      const categoryName = service.category?.name || 'Other';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(service);
      return acc;
    }, {}) || {};

  return { data: result.data.data, error: null, categorizedServices };
}

export async function getBranches(): Promise<ApiResponse<Branch[]>> {
  const result = await fetcher<{ data: Branch[] }>(endpoints.branches);

  if (result.error) {
    return { data: null, error: result.error };
  }

  if (!result.data?.data || !Array.isArray(result.data.data)) {
    return {
      data: null,
      error: new Error('Invalid response format: expected array in data field'),
    };
  }

  return { data: result.data.data, error: null };
}
