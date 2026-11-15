-- Useful SQL queries (Member 2). Run them in any SQLite client.

-- All rooms
SELECT * FROM rooms;

-- Rooms in a block
SELECT * FROM rooms WHERE block = 'A' COLLATE NOCASE;

-- Free rooms (the warden's main problem!)
SELECT r.* FROM rooms r
LEFT JOIN allotments a ON a.room_id = r.id
WHERE a.id IS NULL
ORDER BY r.block, r.name;

-- Free rooms count per block
SELECT r.block, COUNT(*) AS free_rooms
FROM rooms r LEFT JOIN allotments a ON a.room_id = r.id
WHERE a.id IS NULL
GROUP BY r.block;

-- Allotments with resident name and room name (the JOIN)
SELECT a.id, res.name AS resident_name, rm.name AS room_name, rm.block, a.allotted_on
FROM allotments a
JOIN residents res ON res.id = a.resident_id
JOIN rooms rm      ON rm.id  = a.room_id;

-- Residents without a room
SELECT res.* FROM residents res
LEFT JOIN allotments a ON a.resident_id = res.id
WHERE a.id IS NULL;

-- Manage records
INSERT INTO rooms (name, block) VALUES ('D-401', 'D');
UPDATE rooms SET block = 'B' WHERE name = 'D-401';
DELETE FROM rooms WHERE name = 'D-401';
