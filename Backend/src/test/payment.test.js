const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('Payment API', () => {

    beforeAll(async () => {
        await mongoose.connection.collection('payments').deleteMany({});
    });

    test('Create a new Payment', async () => {
        const payment = {
            "code": 123456789,
            "user": 123456789,
            "order": 123456789,
            "methodPayment": 123456789,
            "success": true
        };
        await api
            .post('/api/payments')
            .send(payment)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Get all Payments', async () => {
        await api
            .get('/api/payments')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a Payment by Code', async () => {
        await api
            .get('/api/payments/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a Payment by User', async () => {
        await api
            .get('/api/payments/user/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a Payment by Code', async () => {
        const payment = {
            "user": 123456789,
            "order": 123456789,
            "methodPayment": 123456789,
            "success": true
        };

        await api
            .put('/api/payments/123456789')
            .send(payment)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a Payment by Code', async () => {
        await api
            .delete('/api/payments/123456789')
            .expect(200);
    });

    afterAll(() => {
        server.close();
        mongoose.connection.close();
    });

});