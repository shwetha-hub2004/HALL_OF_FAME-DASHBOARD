ALTER TABLE users
ADD COLUMN role ENUM('user', 'admin') NOT NULL DEFAULT 'user';

-- Optionally, update specific users to admin role, e.g.:
-- UPDATE users SET role = 'admin' WHERE username = 'admin_username';
