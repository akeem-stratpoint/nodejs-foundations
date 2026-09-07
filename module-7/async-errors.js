// async-errors.js
const express = require('express');

const app = express();

app.get('/slow', async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Something went wrong');
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: { status, message } });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Async errors demo running at http://localhost:${PORT}`);
});
