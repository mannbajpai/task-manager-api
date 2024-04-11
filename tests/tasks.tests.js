import request from 'supertest';
import app from '../app.js';

describe('Task API Endpoints', () => {
    let authToken = '';

    beforeAll(async () => {
        // Login to get the authentication token
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        authToken = res.body.token;
    });

    it('should fetch all tasks', async () => {
        const res = await request(app)
            .get('/api/v1/tasks')
            .set('Authorization', `${authToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/v1/tasks')
            .send({
                "title": 'Test Task',
                "description": 'Test Task Description'
            })
            .set('Authorization', `${authToken}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Test Task');
        expect(res.body.description).toEqual('Test Task Description');
    });


});
