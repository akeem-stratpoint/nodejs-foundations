// src/routes/notes.js
const express = require('express');
const prisma = require('../db');
const { validateNoteInput } = require('../middleware/validate');

const router = express.Router();

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(notes);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return next({ status: 404, message: 'Note not found' });
    }

    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return next({ status: 404, message: 'Note not found' });
    }

    res.json(note);
  })
);

router.post(
  '/',
  validateNoteInput,
  asyncHandler(async (req, res) => {
    const { title, content, tag } = req.body;
    const note = await prisma.note.create({
      data: { title, content, tag: tag || null },
    });
    res.status(201).json(note);
  })
);

router.put(
  '/:id',
  validateNoteInput,
  asyncHandler(async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return next({ status: 404, message: 'Note not found' });
    }

    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) {
      return next({ status: 404, message: 'Note not found' });
    }

    const { title, content, tag } = req.body;
    const note = await prisma.note.update({
      where: { id },
      data: { title, content, tag: tag || null },
    });

    res.json(note);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return next({ status: 404, message: 'Note not found' });
    }

    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) {
      return next({ status: 404, message: 'Note not found' });
    }

    await prisma.note.delete({ where: { id } });
    res.status(204).send();
  })
);

module.exports = router;
