export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  userProfile: '/api/v1/user/me',
  users: '/api/v1/user',

  services: '/api/v1/service',
  service: (id: string) => `/api/v1/service/${id}`,

  branches: '/api/v1/branch',

  bookings: '/api/v1/booking',
  booking: (id: string) => `/api/v1/booking/${id}`,

  availableTimeSlots: '/api/v1/booking/slots',
};
