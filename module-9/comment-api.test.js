// comment-api.test.js
// trying TDD cycle: red (test fails) → green (test passes) → refactor.
const request = require('supertest');
const createApp = require('./comment-api');

describe('Comments API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe('POST /comments', () => {
    test('creates a comment', async () => {
      const res = await request(app)
        .post('/comments')
        .send({ text: 'Nice post!', author: 'Jane' });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ text: 'Nice post!', author: 'Jane' });
    });

    test('returns 400 if text is missing', async () => {
      const res = await request(app).post('/comments').send({ author: 'Jane' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    test('returns 400 if author is missing', async () => {
      const res = await request(app).post('/comments').send({ text: 'Nice post!' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /comments', () => {
    test('returns all comments', async () => {
      await request(app).post('/comments').send({ text: 'First', author: 'Jane' });
      await request(app).post('/comments').send({ text: 'Second', author: 'John' });

      const res = await request(app).get('/comments');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /comments/:id', () => {
    test('returns one comment', async () => {
      const created = await request(app)
        .post('/comments')
        .send({ text: 'Hello', author: 'Jane' });
      const res = await request(app).get(`/comments/${created.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body.text).toBe('Hello');
    });

    test('returns 404 for missing ids', async () => {
      const res = await request(app).get('/comments/999');
      expect(res.status).toBe(404);
    });
  });
});
