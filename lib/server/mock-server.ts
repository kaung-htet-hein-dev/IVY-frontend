import { createServer } from 'miragejs';
import { Service } from '@/store/api/service/types';
import { BookingStatus } from '@/store/api/booking/types';
import { Branch } from '@/store/api/branch/types';
import { services, userBookings } from '@/utils/data';

const branches: Branch[] = [
  {
    id: '1',
    name: 'Downtown Branch',
    address: '123 Main Street, Downtown',
    phone: '+1 234-567-8900',
    isActive: true,
    openingHours: '9:00 AM - 7:00 PM',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Uptown Branch',
    address: '456 High Street, Uptown',
    phone: '+1 234-567-8901',
    isActive: true,
    openingHours: '9:00 AM - 8:00 PM',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

let isServerStarted = false;

// In-memory storage for bookings
let bookings = [...userBookings];

export function startMockServer() {
  if (isServerStarted) {
    console.log('Mock server is already running');
    return;
  }

  isServerStarted = true;
  console.log('Starting mock server...');

  createServer({
    routes() {
      this.namespace = '/api/v1';
      this.timing = 800;

      // Get all services
      this.get('/services', () => ({
        data: services,
        message: 'Services retrieved successfully',
      }));

      // Get service by ID
      this.get('/services/:id', (schema, request) => {
        const service = services.find(s => s.id === request.params.id);
        return service
          ? { data: service, message: 'Service found' }
          : { data: null, message: 'Service not found', status: 404 };
      });

      // Create service
      this.post('/services', (schema, request) => {
        const newService = JSON.parse(request.requestBody);
        const service: Service = {
          ...newService,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        services.push(service);
        return { data: service, message: 'Service created successfully' };
      });

      // Update service
      this.put('/services/:id', (schema, request) => {
        const id = request.params.id;
        const updates = JSON.parse(request.requestBody);
        const serviceIndex = services.findIndex(s => s.id === id);

        if (serviceIndex === -1) {
          return { data: null, message: 'Service not found', status: 404 };
        }

        services[serviceIndex] = {
          ...services[serviceIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        return {
          data: services[serviceIndex],
          message: 'Service updated successfully',
        };
      });

      // Delete service
      this.delete('/services/:id', (schema, request) => {
        const id = request.params.id;
        const serviceIndex = services.findIndex(s => s.id === id);

        if (serviceIndex === -1) {
          return { data: null, message: 'Service not found', status: 404 };
        }

        services.splice(serviceIndex, 1);
        return { data: null, message: 'Service deleted successfully' };
      });

      // Get all branches
      this.get('/branches', () => ({
        data: branches,
        message: 'Branches retrieved successfully',
      }));

      // Get branch by ID
      this.get('/branches/:id', (schema, request) => {
        const branch = branches.find(b => b.id === request.params.id);
        return branch
          ? { data: branch, message: 'Branch found' }
          : { data: null, message: 'Branch not found', status: 404 };
      });

      // Get all bookings
      this.get('/bookings', () => ({
        data: bookings,
        message: 'Bookings retrieved successfully',
      }));

      // Get available time slots
      this.post('/services/availiable-time-slot', (schema, request) => {
        const { date, serviceId, branchID } = JSON.parse(request.requestBody);
        // For mock purposes, return different time slots for different branches
        const mockTimeSlots = [
          { slot: '9:00', isAvailable: true },
          { slot: '9:30', isAvailable: false },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
          { slot: '10:00', isAvailable: true },
          { slot: '10:30', isAvailable: true },
        ];

        return { data: mockTimeSlots };
      });

      // Get booking by ID
      this.get('/bookings/:id', (schema, request) => {
        const booking = bookings.find(b => b.id === request.params.id);
        return booking
          ? { data: booking, message: 'Booking found' }
          : { data: null, message: 'Booking not found', status: 404 };
      });

      // Create booking
      this.post('/bookings', (schema, request) => {
        const newBooking = JSON.parse(request.requestBody);
        const booking = {
          ...newBooking,
          id: Math.random().toString(36).substr(2, 9),
          status: BookingStatus.CONFIRMED,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        bookings.push(booking);
        return { data: booking, message: 'Booking created successfully' };
      });

      // Update booking
      this.put('/bookings/:id', (schema, request) => {
        const id = request.params.id;
        const updates = JSON.parse(request.requestBody);
        const bookingIndex = bookings.findIndex(b => b.id === id);

        if (bookingIndex === -1) {
          return { data: null, message: 'Booking not found', status: 404 };
        }

        bookings[bookingIndex] = {
          ...bookings[bookingIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        return {
          data: bookings[bookingIndex],
          message: 'Booking updated successfully',
        };
      });
    },
  });
}
