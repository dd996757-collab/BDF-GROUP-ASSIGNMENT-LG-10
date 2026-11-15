-- HostelHub schema (Member 2)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS residents (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  email  TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS rooms (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  block  TEXT NOT NULL,
  UNIQUE (name, block)
);

CREATE TABLE IF NOT EXISTS allotments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  resident_id  INTEGER NOT NULL,
  room_id      INTEGER NOT NULL UNIQUE,   -- a room can be allotted to only one resident
  allotted_on  TEXT NOT NULL DEFAULT (date('now')),
  FOREIGN KEY (resident_id) REFERENCES residents(id),
  FOREIGN KEY (room_id)     REFERENCES rooms(id)
);
