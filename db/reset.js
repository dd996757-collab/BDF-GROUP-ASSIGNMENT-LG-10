// Deletes the database file so it is rebuilt with fresh sample data: npm run reset-db
const fs = require('fs');
const path = require('path');
for (const f of ['hostelhub.db', 'hostelhub.db-shm', 'hostelhub.db-wal']) {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}
console.log('Database deleted. It will be recreated on next start.');
