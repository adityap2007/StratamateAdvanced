-- Seed events
INSERT INTO events (title, date, time, location, description, attendees) VALUES
('Community BBQ', '2024-04-15', '12:00', 'Rooftop Garden', 'Join us for our monthly community BBQ!', 32),
('Residents Meeting', '2024-04-20', '18:30', 'Common Room', 'Monthly residents meeting to discuss building matters.', 25);

-- Seed notices
INSERT INTO notices (title, description) VALUES
('Building Updates', 'View the latest building maintenance and improvement updates.'),
('Community Announcements', 'Read important announcements from the strata committee.'),
('Emergency Notices', 'Access critical information and emergency notifications.');

-- Seed contact messages
INSERT INTO contact_messages (name, email, message) VALUES
('John Doe', 'john@example.com', 'Hello, I need assistance with my unit.'),
('Jane Smith', 'jane@example.com', 'Great platform, thanks!');

-- (Optional) Seed residents table for total_residents
CREATE TABLE IF NOT EXISTS residents (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  unit text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO residents (name, unit) VALUES
('Alice Johnson', 'Unit 1'),
('Bob Martin', 'Unit 2'),
('Carol Davis', 'Unit 3'),
('David Lee', 'Unit 4');

-- (Optional) Seed maintenance_requests table for maintenance stats
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id bigserial PRIMARY KEY,
  unit text NOT NULL,
  description text NOT NULL,
  priority text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO maintenance_requests (unit, description, priority) VALUES
('Unit 1', 'Leaky faucet in kitchen', 'high'),
('Unit 2', 'Broken light fixture', 'low'),
('Unit 4', 'Door lock jammed', 'high');

-- (Optional) Seed payments table for payment stats
CREATE TABLE IF NOT EXISTS payments (
  id bigserial PRIMARY KEY,
  unit text NOT NULL,
  amount numeric NOT NULL,
  paid_at timestamp with time zone DEFAULT now()
);

INSERT INTO payments (unit, amount) VALUES
('Unit 1', 100.00),
('Unit 2', 200.00),
('Unit 3', 150.00);

-- Create logins table for tracking user visits
CREATE TABLE IF NOT EXISTS logins (
  id bigserial PRIMARY KEY,
  user_id text NOT NULL,
  login_at timestamp with time zone DEFAULT now()
); 