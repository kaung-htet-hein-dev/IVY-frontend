import { createServer } from 'miragejs';

export function startMockServer() {
  createServer({
    routes() {
      this.namespace = '/api'; // Prefix all MirageJS routes with DEMO_BASE_URL

      this.timing = 800; // Simulate network latency

      this.get('/movies', () => ({
        movies: [
          { id: 1, name: 'Inception', year: 2010 },
          { id: 2, name: 'Interstellar', year: 2014 },
          { id: 3, name: 'Dunkirk', year: 2017 },
        ],
      }));
    },
  });
}
