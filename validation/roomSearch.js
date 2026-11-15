// =====================================================================
// MEMBER 4 - Search rooms using query parameters
//   /rooms?block=A          search by block
//   /rooms?name=101         name contains text
//   /rooms?available=true   only free rooms (false = occupied)
// Returns { where, params } for the SQL query, or { error } for bad input.
// =====================================================================
function buildRoomSearch(query) {
  const { block, name, available } = query;
  const where = [];
  const params = [];

  if (block !== undefined) {
    if (typeof block !== 'string' || block.trim() === '') {
      return { error: 'block search value cannot be empty' };
    }
    where.push('r.block = ? COLLATE NOCASE');
    params.push(block.trim());
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return { error: 'name search value cannot be empty' };
    }
    where.push('r.name LIKE ?');
    params.push(`%${name.trim()}%`);
  }

  if (available !== undefined) {
    if (available !== 'true' && available !== 'false') {
      return { error: "available must be 'true' or 'false'" };
    }
    where.push(available === 'true' ? 'a.id IS NULL' : 'a.id IS NOT NULL');
  }

  return { where, params };
}

module.exports = { buildRoomSearch };
