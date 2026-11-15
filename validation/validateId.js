// MEMBER 4 - Checks that :id in the URL is a positive whole number.
function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID must be a positive whole number' });
  }
  req.id = id;
  next();
}

module.exports = { validateId };
