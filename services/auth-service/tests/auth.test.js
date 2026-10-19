const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

jest.mock('../src/models/User');

describe('Auth Service API', () => {
  beforeEach(() => jest.clearAllMocks());

  it('GET /api/auth/health devrait retourner OK', async () => {
    const res = await request(app).get('/api/auth/health');
    expect(res.statusCode).toEqual(200);
  });

  it('POST /api/auth/register devrait créer un utilisateur', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: '123', email: 'test@test.com', name: 'Test' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: 'password123', name: 'Test' });

    expect(res.statusCode).toEqual(201);
  });

  it('POST /api/auth/register devrait échouer si email existe (409)', async () => {
    User.findOne.mockResolvedValue({ id: '123', email: 'test@test.com' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: 'password123', name: 'Test' });
    expect(res.statusCode).toEqual(409);
  });

  it('POST /api/auth/login devrait connecter un utilisateur', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    User.findOne.mockResolvedValue({ id: '123', email: 'test@test.com', password: hashedPassword });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});