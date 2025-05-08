-- Create a new admin user with username 'admin' and password 'admin123'
USE space_hall_of_fame;

INSERT INTO users (username, email, password_hash, role) VALUES (
    'admin',
    'admin@example.com',
    '$2y$10$2DnSq629HlSiQiS2xkwDhuemOMn2k1kPND0D2Z.K2LCImTDEcYPMu',
    'admin'
)
ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    role = VALUES(role);
