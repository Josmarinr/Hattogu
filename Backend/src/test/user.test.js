const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('User API', () => {

    beforeAll(async () => {
        await mongoose.connection.collection('users').deleteMany({});
    });

    test('Create a new User', async () => {
        const user = {
            "cedula": 123456789,
            "name": "Test",
            "email": "test@gmail.com",
            "password": "123456",
            "money": 100
        };
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Get all Users', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a User by Cedula', async () => {
        await api
            .get('/api/users/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a User by Cedula', async () => {
        const user = {
            "name": "Test",
            "email": "test1@gmail.com",
            "password": "123456",
            "money": 10
        };

        await api
            .put('/api/users/123456789')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a User by Cedula', async () => {
        await api
            .delete('/api/users/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    afterAll(async () => {
        server.close();
        mongoose.connection.close();
    });
});