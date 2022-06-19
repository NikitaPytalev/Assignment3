import 'dotenv/config';
import request from 'supertest';
import initServer from './index';

const server = initServer();

describe('Scenario 1: Add user', () => {
    let expectedId = '';
    const user = {
        username: 'test_user_1',
        age: 100,
        hobbies: ['test1', 'test2'],
    };

    it('GET /api/users returns status code 200 and an empty array', async () => {
        const res = await request(server).get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)

            expect(res.body.length).toEqual(0);
    });

    it('POST /api/users returns status code 201 and adds user', async () => {
        const res = await request(server).post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /json/)

        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual(user.username);
        expect(res.body.age).toEqual(user.age);
        expect(res.body.hobbies).toEqual(user.hobbies);
        expectedId = res.body.id;
    });

    it('GET /api/user/{existent uuid} returns status code 200 and the user', async () => {
        const res = await request(server).get(`/api/users/${expectedId}`)
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual(user.username);
        expect(res.body.age).toEqual(user.age);
        expect(res.body.hobbies).toEqual(user.hobbies);
    });

    afterAll(() => {
        server.close();
    });
});

describe('Scenario 2: Update user', () => {
    let expectedId = '';
    let user = {
        username: 'test_user_1',
        age: 100,
        hobbies: ['test1', 'test2'],
    };

    it('POST /api/users returns status code 201 and adds user', async () => {
        const res = await request(server).post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /json/)

        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual(user.username);
        expect(res.body.age).toEqual(user.age);
        expect(res.body.hobbies).toEqual(user.hobbies);
        expectedId = res.body.id;
    });

    user.username = 'test_user_1_changed';

    it('PUT /api/users/{id} returns status code 200 and updates the user', async () => {
        const res = await request(server).put(`/api/users/${expectedId}`)
            .send(user)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual(user.username);
        expect(res.body.age).toEqual(user.age);
        expect(res.body.hobbies).toEqual(user.hobbies);
        expectedId = res.body.id;
    });

    it('GET /api/user/{existent uuid} returns status code 200 and the user', async () => {
        const res = await request(server).get(`/api/users/${expectedId}`)
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual(user.username);
        expect(res.body.age).toEqual(user.age);
        expect(res.body.hobbies).toEqual(user.hobbies);
    });
    
    afterAll(() => {
        server.close();
    });
});

describe('Scenario 3: Delete user', () => {
    let expectedId = '';
    let user = {
        username: 'test_user_1',
        age: 100,
        hobbies: ['test1', 'test2'],
    };

    it('POST /api/users returns status code 201 and adds a user', async () => {
        const res = await request(server).post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /json/)

        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toEqual(user.username);
        expect(res.body.age).toEqual(user.age);
        expect(res.body.hobbies).toEqual(user.hobbies);
        expectedId = res.body.id;
    });

    it('DELETE /api/users/{id} returns status code 204 and deletes the user', async () => {
        const res = await request(server).delete(`/api/users/${expectedId}`)
            .expect(204)
    });

    it('GET /api/user/{deleted uuid} returns status code 404', async () => {
        const res = await request(server).get(`/api/users/${expectedId}`)
            .expect(404)
    });
    
    afterAll(() => {
        server.close();
    });
});
