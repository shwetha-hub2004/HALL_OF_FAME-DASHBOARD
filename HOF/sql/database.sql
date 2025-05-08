-- Create database
CREATE DATABASE IF NOT EXISTS space_hall_of_fame;
USE space_hall_of_fame;

-- Table: scientists
CREATE TABLE IF NOT EXISTS scientists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    bio TEXT,
    quote TEXT,
    organization VARCHAR(255),
    country VARCHAR(255)
);

-- Table: achievements
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scientist_id INT NOT NULL,
    content TEXT,
    FOREIGN KEY (scientist_id) REFERENCES scientists(id) ON DELETE CASCADE
);

-- Table: awards
CREATE TABLE IF NOT EXISTS awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scientist_id INT NOT NULL,
    content TEXT,
    FOREIGN KEY (scientist_id) REFERENCES scientists(id) ON DELETE CASCADE
);

-- Table: contributions
CREATE TABLE IF NOT EXISTS contributions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scientist_id INT NOT NULL,
    content TEXT,
    FOREIGN KEY (scientist_id) REFERENCES scientists(id) ON DELETE CASCADE
);

-- Table: gallery
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scientist_id INT NOT NULL,
    image_path VARCHAR(255),
    FOREIGN KEY (scientist_id) REFERENCES scientists(id) ON DELETE CASCADE
);

-- Table: events
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    image VARCHAR(255),
    category ENUM('competition', 'webinar', 'college_event') NOT NULL
);

-- Insert sample data into scientists
INSERT INTO scientists (name, photo, bio, quote, organization, country) VALUES
('Dr. Vikram Sarabhai', 'images/vikram sarabhai 1.jpeg', 'Father of the Indian space program.', 'Science is the key to our future.', 'ISRO', 'India'),
('Dr. A.P.J. Abdul Kalam', 'images/A.P.J.Abdul Kalam 1.jpeg', 'Missile man of India and former President.', 'Dream, dream, dream.', 'ISRO', 'India'),
('Dr. Jane Doe', 'images/.vasagam 1.jpeg', 'Renowned computer scientist.', 'Innovation distinguishes between a leader and a follower.', 'ITCA', 'USA'),
('Dr. John Smith', 'images/Y. S. Rajan.jpeg', 'Astrophysicist and researcher.', 'Look up at the stars and not down at your feet.', 'ISRO', 'UK'),
('Dr. Maria Garcia', 'images/Sivathanu Pillai.jpeg', 'Expert in satellite technology.', 'The sky is not the limit.', 'ITCA', 'Spain'),
('Dr. Chen Wei', 'images/Gen. Sundaram.jpeg', 'Pioneer in space robotics.', 'Exploration is in our nature.', 'ISRO', 'China'),
('Dr. Ahmed Khan', 'images/Mylswamy Annadurai 1.jpeg', 'Leader in aerospace engineering.', 'To confine our attention to terrestrial matters would be to limit the human spirit.', 'ITCA', 'UAE');

-- Insert sample data into achievements
INSERT INTO achievements (scientist_id, content) VALUES
(1, 'Established the Indian Space Research Organisation.'),
(2, 'Developed the Agni and Prithvi missiles.'),
(3, 'Developed advanced algorithms for AI.'),
(4, 'Discovered new exoplanets.'),
(5, 'Led satellite launch missions.'),
(6, 'Invented space robotic arms.'),
(7, 'Designed aerospace propulsion systems.'),
(8, 'Pioneered space medicine protocols.'),
(9, 'Improved satellite communication networks.'),
(10, 'Planned Mars mission trajectories.');

-- Insert sample data into awards
INSERT INTO awards (scientist_id, content) VALUES
(1, 'Padma Bhushan'),
(2, 'Bharat Ratna'),
(3, 'Turing Award'),
(4, 'Royal Astronomical Society Gold Medal'),
(5, 'National Space Award'),
(6, 'IEEE Robotics Award'),
(7, 'Aerospace Excellence Award'),
(8, 'Space Medicine Pioneer Award'),
(9, 'Satellite Communications Award'),
(10, 'Mars Mission Award');

-- Insert sample data into contributions
INSERT INTO contributions (scientist_id, content) VALUES
(1, 'Contributed to satellite technology development.'),
(2, 'Contributed to missile technology.'),
(3, 'Contributed to AI research.'),
(4, 'Contributed to astrophysics research.'),
(5, 'Contributed to satellite launch operations.'),
(6, 'Contributed to space robotics.'),
(7, 'Contributed to aerospace engineering.'),
(8, 'Contributed to space medicine.'),
(9, 'Contributed to satellite communications.'),
(10, 'Contributed to Mars mission planning.');

-- Insert sample data into gallery
INSERT INTO gallery (scientist_id, image_path) VALUES
(1, 'images/vikram1.jpg'),
(1, 'images/vikram2.jpg'),
(2, 'images/kalam1.jpg'),
(2, 'images/kalam2.jpg'),
(3, 'images/jane1.jpg'),
(3, 'images/jane2.jpg'),
(4, 'images/john1.jpg'),
(4, 'images/john2.jpg'),
(5, 'images/maria1.jpg'),
(5, 'images/maria2.jpg'),
(6, 'images/chen1.jpg'),
(6, 'images/chen2.jpg'),
(7, 'images/ahmed1.jpg'),
(7, 'images/ahmed2.jpg'),
(8, 'images/lisa1.jpg'),
(8, 'images/lisa2.jpg'),
(9, 'images/carlos1.jpg'),
(9, 'images/carlos2.jpg'),
(10, 'images/elena1.jpg'),
(10, 'images/elena2.jpg');

-- Insert sample data into events
INSERT INTO events (title, description, date, image, category) VALUES
('Space Launch Competition', 'Annual rocket launch competition.', '2024-07-01', 'images/event1.jpg', 'competition'),
('Webinar on Space Technology', 'Online webinar about latest space tech.', '2024-07-15', 'images/event2.jpg', 'webinar'),
('College Space Fest', 'Inter-college space festival.', '2024-08-10', 'images/event3.jpg', 'college_event'),
('Satellite Design Competition', 'Design and build satellites.', '2024-09-05', 'images/event4.jpg', 'competition'),
('Space Robotics Webinar', 'Webinar on robotics in space.', '2024-09-20', 'images/event5.jpg', 'webinar'),
('Annual Science Symposium', 'Symposium on space sciences.', '2024-10-01', 'images/event6.jpg', 'college_event'),
('Rocket Propulsion Competition', 'Competition on rocket engines.', '2024-10-15', 'images/event7.jpg', 'competition'),
('Space Medicine Webinar', 'Webinar on health in space.', '2024-11-05', 'images/event8.jpg', 'webinar'),
('Inter-college Space Quiz', 'Quiz competition for colleges.', '2024-11-20', 'images/event9.jpg', 'college_event'),
('Astrophysics Conference', 'Conference on astrophysics.', '2024-12-01', 'images/event10.jpg', 'college_event'),
('Mars Mission Planning', 'Planning for Mars exploration.', '2025-01-10', 'images/event11.jpg', 'webinar'),
('Satellite Communications Workshop', 'Workshop on satellite comms.', '2025-02-15', 'images/event12.jpg', 'college_event'),
('Space Exploration Competition', 'Competition on space exploration.', '2025-03-05', 'images/event13.jpg', 'competition'),
('Astronomy Webinar', 'Webinar on astronomy topics.', '2025-03-20', 'images/event14.jpg', 'webinar'),
('College Space Hackathon', 'Hackathon for space tech projects.', '2025-04-10', 'images/event15.jpg', 'college_event');
