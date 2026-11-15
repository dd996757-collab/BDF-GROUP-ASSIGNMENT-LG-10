-- Sample data (Member 2)
INSERT INTO residents (name, email) VALUES
  ('Aarav Sharma',  'aarav@hostel.edu'),
  ('Diya Reddy',    'diya@hostel.edu'),
  ('Rohan Verma',   'rohan@hostel.edu'),
  ('Sneha Iyer',    'sneha@hostel.edu'),
  ('Kabir Khan',    'kabir@hostel.edu');

INSERT INTO rooms (name, block) VALUES
  ('A-101', 'A'), ('A-102', 'A'), ('A-103', 'A'),
  ('B-201', 'B'), ('B-202', 'B'), ('B-203', 'B'),
  ('C-301', 'C'), ('C-302', 'C');

INSERT INTO allotments (resident_id, room_id, allotted_on) VALUES
  (1, 1, '2026-06-01'),
  (2, 4, '2026-06-02'),
  (3, 5, '2026-06-03');
