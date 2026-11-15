// =====================================================================
// MEMBER 2 - SQL queries to retrieve and manage records.
// Every SQL statement in the project lives in this file.
// (The same queries in plain SQL are in db/queries.sql)
// =====================================================================
const db = require('./database');

// ---------- ROOMS ----------
const rooms = {
  // where / params / orderBy are supplied by search (Member 4) and sorting (Member 5)
  findAll({ where = [], params = [], orderBy = 'r.id ASC' } = {}) {
    const sql = `
      SELECT r.id, r.name, r.block,
             CASE WHEN a.id IS NULL THEN 1 ELSE 0 END AS is_free
      FROM rooms r
      LEFT JOIN allotments a ON a.room_id = r.id
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY ${orderBy}`;
    return db.prepare(sql).all(...params).map((r) => ({ ...r, is_free: Boolean(r.is_free) }));
  },
  findById(id) {
    return db.prepare('SELECT id, name, block FROM rooms WHERE id = ?').get(id);
  },
  insert(name, block) {
    const info = db.prepare('INSERT INTO rooms (name, block) VALUES (?, ?)').run(name, block);
    return Number(info.lastInsertRowid);
  },
  update(id, name, block) {
    return db.prepare('UPDATE rooms SET name = ?, block = ? WHERE id = ?').run(name, block, id);
  },
  remove(id) {
    return db.prepare('DELETE FROM rooms WHERE id = ?').run(id);
  },
  isAllotted(id) {
    return Boolean(db.prepare('SELECT id FROM allotments WHERE room_id = ?').get(id));
  },
};

// ---------- RESIDENTS ----------
const residents = {
  findAll() {
    return db.prepare('SELECT id, name, email FROM residents ORDER BY id').all();
  },
  findById(id) {
    return db.prepare('SELECT id, name, email FROM residents WHERE id = ?').get(id);
  },
  insert(name, email) {
    const info = db.prepare('INSERT INTO residents (name, email) VALUES (?, ?)').run(name, email);
    return Number(info.lastInsertRowid);
  },
  update(id, name, email) {
    return db.prepare('UPDATE residents SET name = ?, email = ? WHERE id = ?').run(name, email, id);
  },
  remove(id) {
    return db.prepare('DELETE FROM residents WHERE id = ?').run(id);
  },
  hasAllotment(id) {
    return Boolean(db.prepare('SELECT id FROM allotments WHERE resident_id = ?').get(id));
  },
};

// ---------- ALLOTMENTS ----------
// JOIN: allotments + resident name + room name
const JOIN_SQL = `
  SELECT a.id,
         a.resident_id,
         res.name  AS resident_name,
         a.room_id,
         rm.name   AS room_name,
         rm.block  AS block,
         a.allotted_on
  FROM allotments a
  JOIN residents res ON res.id = a.resident_id
  JOIN rooms rm      ON rm.id  = a.room_id`;

const allotments = {
  findAllJoined() {
    return db.prepare(JOIN_SQL + ' ORDER BY a.id').all();
  },
  findJoinedById(id) {
    return db.prepare(JOIN_SQL + ' WHERE a.id = ?').get(id);
  },
  findByRoom(roomId) {
    return db.prepare('SELECT id FROM allotments WHERE room_id = ?').get(roomId);
  },
  findByResident(residentId) {
    return db.prepare('SELECT id FROM allotments WHERE resident_id = ?').get(residentId);
  },
  insert(residentId, roomId) {
    const info = db.prepare('INSERT INTO allotments (resident_id, room_id) VALUES (?, ?)').run(residentId, roomId);
    return Number(info.lastInsertRowid);
  },
  remove(id) {
    return db.prepare('DELETE FROM allotments WHERE id = ?').run(id);
  },
};

module.exports = { rooms, residents, allotments };
