const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('Order API', () => {

    beforeAll(async () => {
        await mongoose.connection.collection('orders').deleteMany({});
    });

    test('Create a new Order', async () => {
        const order = {
            "code": 123456789,
            "tshirt": 123456789,
            "stamped": 123456789,
            "quantity": 123456789,
            "total": 123456789
        };
        await api
            .post('/api/orders')
            .send(order)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Get all Orders', async () => {
        await api
            .get('/api/orders')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a Order by Code', async () => {
        await api
            .get('/api/orders/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a Order by Code', async () => {
        const order = {
            "tshirt": 123456789,
            "stamped": 123456789,
            "quantity": 123456789,
            "total": 123456789
        };

        await api
            .put('/api/orders/123456789')
            .send(order)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a Order by Code', async () => {
        await api
            .delete('/api/orders/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update Quantity a Order by Code', async () => {
        const order = {
            "quantity": 123456789
        };

        await api
            .put('/api/orders/123456789')
            .send(order)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Update Total a Order by Code', async () => {
        const order = {
            "total": 123456789
        };

        await api
            .put('/api/orders/123456789')
            .send(order)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Update Tshirt a Order by Code', async () => {
        const order = {
            "tshirt": 123456789
        };

        await api
            .put('/api/orders/123456789')
            .send(order)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Update Stamped a Order by Code', async () => {
        const order = {
            "stamped": 123456789
        };

        await api
            .put('/api/orders/123456789')
            .send(order)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    afterAll(() => {
        server.close();
        mongoose.connection.close();
    });

});