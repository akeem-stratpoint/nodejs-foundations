// tests/notes.test.js
const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/db');

afterAll(async () => {
  await prisma.note.deleteMany({ where: { title: { startsWith: '__test__' } } });
  await prisma.$disconnect();
});

describe('Notes API', () => {
  let createdId;

  test('POST /notes creates a note (happy path)', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: '__test__ Shopping list', content: 'Milk, bread, eggs', tag: 'personal' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: '__test__ Shopping list',
      content: 'Milk, bread, eggs',
      tag: 'personal',
    });
    expect(res.body.id).toBeDefined();

    createdId = res.body.id;
  });

  test('POST /notes rejects a missing title (error path)', async () => {
    const res = await request(app).post('/notes').send({ content: 'No title here' });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/title/i);
  });

  test('GET /notes/:id returns the created note', async () => {
    const res = await request(app).get(`/notes/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  test('GET /notes/:id returns 404 for a non-existent note', async () => {
    const res = await request(app).get('/notes/999999999');

    expect(res.status).toBe(404);
  });

  test('DELETE /notes/:id deletes the note', async () => {
    const res = await request(app).delete(`/notes/${createdId}`);
    expect(res.status).toBe(204);

    const followUp = await request(app).get(`/notes/${createdId}`);
    expect(followUp.status).toBe(404);
  });
});
