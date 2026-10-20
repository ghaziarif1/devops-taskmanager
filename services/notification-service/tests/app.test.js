const request = require('supertest');
const app = require('../src/app');

describe('Notification Service API', () => {
  it('GET /health devrait retourner OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('service', 'notification-service');
  });
});