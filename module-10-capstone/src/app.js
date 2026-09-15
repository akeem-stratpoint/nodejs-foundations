// src/app.js
const express = require('express');
const notesRouter = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/notes', notesRouter);

app.use((req, res, next) => {
  next({ status: 404, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
