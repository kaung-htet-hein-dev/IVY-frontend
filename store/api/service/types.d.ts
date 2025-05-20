export interface Service {
  id: string;
  name: string;
  description: string;
  durationMinute: number;
  price: number;
  category: Partial<ServiceCategory>;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AvailableTimeSlotsRequest {
  date: string;
  serviceId: string;
}

export type AvailableTimeSlotsResponse = Array<{ slot: string; isAvailable: boolean }>;
