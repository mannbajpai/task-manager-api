import request from 'supertest';
import app from '../app.js';

describe('Task API Endpoints', () => {
    let authToken = '';
    let taskId;
    beforeAll(async () => {
        // Login to get the authentication token
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                username: 'test_user1',
                password: 'testpassword'
            });
        authToken = res.body.token;

        // Create a new task for testing
        const taskRes = await request(app)
            .post('/api/v1/tasks')
            .send({
                "title": 'Test Task',
                "description": 'This is a test task'
            })
            .set('Authorization', `${authToken}`);
        taskId = taskRes.body.id;
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

    describe('GET /api/v1/tasks/:taskId', () => {
        it('should get a task by ID', async () => {
          const res = await request(app)
            .get(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `${authToken}`);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toEqual(taskId);
        });
    
        it('should return 401 if task ID does not exist', async () => {
          const res = await request(app).get('/api/v1/tasks/9999');
          expect(res.statusCode).toEqual(401);
        });
      });
    
      describe('PUT /api/v1/tasks/:taskId', () => {
        it('should update a task', async () => {
          const res = await request(app)
            .put(`/api/v1/tasks/${taskId}`)
            .send({
              title: 'Updated Test Task',
              description: 'This is an updated test task'
            })
            .set('Authorization', `${authToken}`);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toEqual(taskId);
          expect(res.body.title).toEqual('Updated Test Task');
          expect(res.body.description).toEqual('This is an updated test task');
        });
    
        it('should return 401 if task ID does not exist', async () => {
          const res = await request(app)
            .put('/api/v1/tasks/9999')
            .send({
              title: 'Updated Test Task',
              description: 'This is an updated test task'
            });
          expect(res.statusCode).toEqual(401);
        });
      });
    
      describe('DELETE /api/v1/tasks/:taskId', () => {
        it('should delete a task', async () => {
          const res = await request(app)
            .delete(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `${authToken}`);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('message', 'Task deleted successfully');
        });
    
        it('should return 401 if task ID does not exist', async () => {
          const res = await request(app).delete('/api/v1/tasks/9999');
          expect(res.statusCode).toEqual(401);
        });
      });
    });

