const API_PREFIX = '/api/v1';

export const endpoints = {
  getServices: `${API_PREFIX}/services`,
  getServiceById: (id: string) => `${API_PREFIX}/services/${id}`,
  createService: `${API_PREFIX}/services`,
  updateService: (id: string) => `${API_PREFIX}/services/${id}`,
  deleteService: (id: string) => `${API_PREFIX}/services/${id}`,
  getAvailableTimeSlots: `${API_PREFIX}/services/availiable-time-slot`,

  // Branch endpoints
  getBranches: `${API_PREFIX}/branches`,
  getBranchById: (id: string) => `${API_PREFIX}/branches/${id}`,

  // Booking endpoints
  getBookings: `${API_PREFIX}/bookings`,
  getBookingById: (id: string) => `${API_PREFIX}/bookings/${id}`,
  createBooking: `${API_PREFIX}/bookings`,
  updateBooking: (id: string) => `${API_PREFIX}/bookings/${id}`,
};
