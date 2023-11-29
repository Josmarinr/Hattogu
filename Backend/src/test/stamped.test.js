const supertest = require('supertest'); 
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

describe('Stamped API', () => {

    beforeAll(async () => {
        await mongoose.connection.collection('stampeds').deleteMany({});
    });

    test('Create a new Stamped', async () => {
        const stamped = {
            "code": 123456789,
            "name": "Test",
            "price": 100,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAdidas-Originals-Trefoil-T-Shirt%2Fdp%2FB07KQKJY3D&psig=AOvVaw3q4mY1cX7h0sX9JpJ4Z4nW&ust=1623449065593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjIyq6HrPECFQAAAAAdAAAAABAD",
            "artist": 123456789
        };
        await api
            .post('/api/stampeds')
            .send(stamped)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Get all Stampeds', async () => {
        await api
            .get('/api/stampeds')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a Stamped by Code', async () => {
        await api
            .get('/api/stampeds/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Get a Stamped by Artist', async () => {
        await api
            .get('/api/stampeds/artist/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a Stamped by Code', async () => {
        const stamped = {
            "name": "Test",
            "price": 100,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAdidas-Originals-Trefoil-T-Shirt%2Fdp%2FB07KQKJY3D&psig=AOvVaw3q4mY1cX7h0sX9JpJ4Z4nW&ust=1623449065593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjIyq6HrPECFQAAAAAdAAAAABAD"
        };

        await api
            .put('/api/stampeds/123456789')
            .send(stamped)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Update a Stamped by Artist', async () => {
        const stamped = {
            "name": "Test",
            "price": 100,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAdidas-Originals-Trefoil-T-Shirt%2Fdp%2FB07KQKJY3D&psig=AOvVaw3q4mY1cX7h0sX9JpJ4Z4nW&ust=1623449065593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjIyq6HrPECFQAAAAAdAAAAABAD"
        };

        await api
            .put('/api/stampeds/artist/123456789')
            .send(stamped)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a Stamped by Code', async () => {
        await api
            .delete('/api/stampeds/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('Delete a Stamped by Artist', async () => {
        const stamped = {
            "code": 123456789,
            "name": "Test",
            "price": 100,
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAdidas-Originals-Trefoil-T-Shirt%2Fdp%2FB07KQKJY3D&psig=AOvVaw3q4mY1cX7h0sX9JpJ4Z4nW&ust=1623449065593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjIyq6HrPECFQAAAAAdAAAAABAD",
            "artist": 123456789
        };
        await api
            .post('/api/stampeds')
            .send(stamped)

        await api
            .delete('/api/stampeds/artist/123456789')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    afterAll(() => {
        mongoose.connection.close();
        server.close();
    });
});