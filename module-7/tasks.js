// tasks.js
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Exercise 7.1: log how long each request took, once it finishes
function requestTimer(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.path} took ${elapsed}ms`);
  });
  next();
}
app.use(requestTimer);

let tasks = [
  { id: 1, title: 'Learn middleware', done: false }
];
let nextId = 2;

// Custom error class for HTTP errors
class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    if (details) this.details = details;
  }
}

// Exercise 7.2: require an API key on write routes only
function fakeAuth(req, res, next) {
  const apiKey = req.get('X-API-Key');
  if (apiKey !== 'secret123') {
    return next(new HttpError(401, 'Missing or invalid X-API-Key header'));
  }
  next();
}

// Exercise 7.3: validation middleware that collects every error, not just the first
function validateTask(req, res, next) {
  const { title, done } = req.body;
  const details = [];

  if (title === undefined || title === null || title === '') {
    details.push('title is required');
  } else if (typeof title !== 'string') {
    details.push('title must be a string');
  } else if (title.length > 100) {
    details.push('title must be 100 characters or less');
  }

  if (done !== undefined && typeof done !== 'boolean') {
    details.push('done must be a boolean');
  }

  if (details.length > 0) {
    return next(new HttpError(400, 'Validation failed', details));
  }

  next();
}

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res, next) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return next(new HttpError(404, 'Task not found'));
  res.json(task);
});

app.post('/tasks', fakeAuth, validateTask, (req, res) => {
  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', fakeAuth, validateTask, (req, res, next) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return next(new HttpError(404, 'Task not found'));
  task.title = req.body.title;
  if (req.body.done !== undefined) task.done = req.body.done;
  res.json(task);
});

app.delete('/tasks/:id', fakeAuth, (req, res, next) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return next(new HttpError(404, 'Task not found'));
  tasks.splice(idx, 1);
  res.status(204).send();
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  next(new HttpError(404, `Route not found: ${req.method} ${req.path}`));
});

// Global error handler (4 arguments!)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  console.error(`[ERROR] ${status} ${message}`);
  const body = { error: { status, message } };
  if (err.details) body.error.details = err.details;
  res.status(status).json(body);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tasks API running at http://localhost:${PORT}`);
});
