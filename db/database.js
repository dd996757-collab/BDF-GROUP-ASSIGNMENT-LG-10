const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, 'hostelhub.db'));
db.pragma('foreign_keys = ON');

// Create tables
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

// Insert sample data only the first time (when the rooms table is empty)
const { count } = db.prepare('SELECT COUNT(*) AS count FROM rooms').get();
if (count === 0) {
  db.exec(fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8'));
  console.log('Sample data inserted.');
}

module.exports = db;
