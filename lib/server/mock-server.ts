import { createServer } from 'miragejs';
import { Service } from '@/store/api/service/types';
import { services } from '@/utils/data';

let isServerStarted = false;

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
    },
  });
}
