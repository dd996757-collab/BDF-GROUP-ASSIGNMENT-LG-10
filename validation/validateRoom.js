// =====================================================================
// MEMBER 4 - Validation of room details (used for POST and PUT)
// Gives clear error messages and handles missing / invalid values.
// =====================================================================
function validateRoom(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Request body must be a JSON object' });
  }

  const errors = [];
  const { name, block } = body;

  // name
  if (name === undefined || name === null || name === '') {
    errors.push('name is required');
  } else if (typeof name !== 'string') {
    errors.push('name must be text');
  } else if (name.trim().length < 1 || name.trim().length > 30) {
    errors.push('name must be 1 to 30 characters');
  }

  // block
  if (block === undefined || block === null || block === '') {
    errors.push('block is required');
  } else if (typeof block !== 'string') {
    errors.push('block must be text');
  } else if (!/^[A-Za-z0-9]{1,10}$/.test(block.trim())) {
    errors.push('block must be 1 to 10 letters or digits (e.g. A, B, C)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  // cleaned values used by the controller
  req.cleanRoom = { name: name.trim(), block: block.trim().toUpperCase() };
  next();
}

module.exports = { validateRoom };
