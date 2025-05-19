const API_PREFIX = '/api/v1';

export const endpoints = {
  getServices: `${API_PREFIX}/services`,
  getServiceById: (id: string) => `${API_PREFIX}/services/${id}`,
  createService: `${API_PREFIX}/services`,
  updateService: (id: string) => `${API_PREFIX}/services/${id}`,
  deleteService: (id: string) => `${API_PREFIX}/services/${id}`,

  // Booking endpoints
  getBookings: `${API_PREFIX}/bookings`,
  getBookingById: (id: string) => `${API_PREFIX}/bookings/${id}`,
  createBooking: `${API_PREFIX}/bookings`,
  updateBooking: (id: string) => `${API_PREFIX}/bookings/${id}`,
};
