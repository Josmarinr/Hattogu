const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('MethodPayment API', () => {

    beforeAll(async () => {
        await mongoose.connection.collection('methodPayments').deleteMany({});
    });

    test('Create a new MethodPayment', async () => {
        const methodPayment = {
            "code": 123456789,
            "method": "nequi"
        };
        await api
            .post('/api/methodPayments')
            .send(methodPayment)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Get all MethodPayments', async () => {
        await api
            .get('/api/methodPayments')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a MethodPayment by Code', async () => {
        await api
            .get('/api/methodPayments/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a MethodPayment by Code', async () => {
        const methodPayment = {
            "method": "efectivo"
        };

        await api
            .put('/api/methodPayments/123456789')
            .send(methodPayment)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a MethodPayment by Code', async () => {
        await api
            .delete('/api/methodPayments/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });

});