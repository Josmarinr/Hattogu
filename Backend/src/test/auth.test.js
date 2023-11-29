const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('Auth API', () => {
    
        beforeAll(async () => {
            await mongoose.connection.collection('users').deleteMany({});
        });
        
        test('Create token', async () => {
            const user = {
                "cedula": 123456789,
                "name": "Test",
                "email": "test@gmail.com",
                "password": "mypassword",
                "money": 100
            };
            await api
                .post('/api/users')
                .send(user)
            const login = {
                "cedula": 123456789,
                "password": "mypassword"
            };
            const response = await api
            .post('/api/login')
            .send(login)
            .expect('Content-Type', /application\/json/);
  });

        afterAll(() => {
            mongoose.connection.close();
            server.close();
        });
});