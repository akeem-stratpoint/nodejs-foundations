// app.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.get('/tasks', async (req, res, next) => {
  try {
    const where = {};
    if (req.query.done !== undefined) where.done = req.query.done === 'true';
    if (req.query.tag) where.tag = req.query.tag;

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Get one task
app.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Create a task (Exercise 8.2: accepts an optional tag)
app.post('/tasks', async (req, res, next) => {
  try {
    const { title, tag } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const task = await prisma.task.create({
      data: { title, tag: tag || null }
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// Update a task
app.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(task);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    next(err);
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res, next) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    next(err);
  }
});


app.get('/notes', async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

app.get('/notes/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

app.post('/notes', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    if (!content) return res.status(400).json({ error: 'content is required' });
    const note = await prisma.note.create({
      data: { title, content }
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

app.put('/notes/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(note);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Note not found' });
    }
    next(err);
  }
});

app.delete('/notes/:id', async (req, res, next) => {
  try {
    await prisma.note.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Note not found' });
    }
    next(err);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tasks API running at http://localhost:${PORT}`);
});
