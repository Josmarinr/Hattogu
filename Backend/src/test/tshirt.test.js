const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('Tshirt API', () => {

    beforeAll(async () => {
        await mongoose.connection.collection('thsirts').deleteMany({});
    });

    test('Create a new Tshirt', async () => {
        const tshirt = {
            "code": 123456789,
            "name": "Test",
            "size": "M",
            "color": "red",
            "price": 100,
            "stock": 10,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAdidas-Originals-Trefoil-T-Shirt%2Fdp%2FB07KQKJY3D&psig=AOvVaw3q4mY1cX7h0sX9JpJ4Z4nW&ust=1623449065593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjIyq6HrPECFQAAAAAdAAAAABAD"
        };
        await api
            .post('/api/tshirts')
            .send(tshirt)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Get all Tshirts', async () => {
        await api
            .get('/api/tshirts')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a Tshirt by Code', async () => {
        await api
            .get('/api/tshirts/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a Tshirt by Code', async () => {
        const tshirt = {
            "name": "Test",
            "size": "M",
            "color": "red",
            "price": 100,
            "stock": 10,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAdidas-Originals-Trefoil-T-Shirt%2Fdp%2FB07KQKJY3D&psig=AOvVaw3q4mY1cX7h0sX9JpJ4Z4nW&ust=1623449065593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjIyq6HrPECFQAAAAAdAAAAABAD"
        };

        await api
            .put('/api/tshirts/123456789')
            .send(tshirt)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a Tshirt by Code', async () => {
        await api
            .delete('/api/tshirts/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update Stock a Tshirt by Code', async () => {
        const tshirt = {
            "stock": 10
        };

        await api
            .put('/api/tshirts/123456789')
            .send(tshirt)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    afterAll(async () => {
        server.close();
        mongoose.connection.close();
    });

});