import request from 'supertest';
import app from '../app.js';
import { json } from 'sequelize';

describe('User API Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/v1/users/register')
            .send({
                "username": 'testuser101',
                "password": 'testpassword'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual('testuser101');
    });

    it('should login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                username: 'testuser2',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
