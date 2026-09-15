// src/middleware/validate.js
function validateNoteInput(req, res, next) {
  const { title, content, tag } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return next({ status: 400, message: 'title is required' });
  }
  if (title.length > 100) {
    return next({ status: 400, message: 'title must be 100 characters or fewer' });
  }

  if (typeof content !== 'string' || content.trim().length === 0) {
    return next({ status: 400, message: 'content is required' });
  }
  if (content.length > 5000) {
    return next({ status: 400, message: 'content must be 5000 characters or fewer' });
  }

  if (tag !== undefined && tag !== null) {
    if (typeof tag !== 'string') {
      return next({ status: 400, message: 'tag must be a string' });
    }
    if (tag.length > 30) {
      return next({ status: 400, message: 'tag must be 30 characters or fewer' });
    }
  }

  next();
}

module.exports = { validateNoteInput };
