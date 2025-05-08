-- Replace 'adminuser' with the desired admin username
UPDATE users SET role = 'admin' WHERE username = 'admin';

-- If you want to create a new admin user manually, you can use the following example:
-- Replace values as needed
INSERT INTO users (username, email, password_hash, role) VALUES (
    'admin',
    'admin@example.com',
    '$2y$10$2DnSq629HlSiQiS2xkwDhuemOMn2k1kPND0D2Z.K2LCImTDEcYPMu',
    'admin'
);
