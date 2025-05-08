-- Insert additional info into events table for 10 events

UPDATE events SET 
    subtitle = 'Annual rocket launch competition with exciting prizes',
    location = 'Space Research Center, Bangalore',
    speakers = '["Dr. Vikram Sarabhai", "Dr. A.P.J. Abdul Kalam"]'
WHERE title = 'Space Launch Competition';

UPDATE events SET 
    subtitle = 'Online webinar about latest space technology advancements',
    location = 'Online',
    speakers = '["Dr. Jane Doe", "Dr. John Smith"]'
WHERE title = 'Webinar on Space Technology';

UPDATE events SET 
    subtitle = 'Inter-college space festival with workshops and contests',
    location = 'National College Auditorium',
    speakers = '["Dr. Maria Garcia", "Dr. Chen Wei"]'
WHERE title = 'College Space Fest';

UPDATE events SET 
    subtitle = 'Design and build satellites competition',
    location = 'Satellite Research Lab',
    speakers = '["Dr. Ahmed Khan", "Dr. Lisa Wong"]'
WHERE title = 'Satellite Design Competition';

UPDATE events SET 
    subtitle = 'Webinar on robotics in space exploration',
    location = 'Online',
    speakers = '["Dr. Chen Wei", "Dr. John Smith"]'
WHERE title = 'Space Robotics Webinar';

UPDATE events SET 
    subtitle = 'Symposium on space sciences and research',
    location = 'City Convention Center',
    speakers = '["Dr. Maria Garcia", "Dr. Vikram Sarabhai"]'
WHERE title = 'Annual Science Symposium';

UPDATE events SET 
    subtitle = 'Competition on rocket engine design',
    location = 'Rocketry Institute',
    speakers = '["Dr. A.P.J. Abdul Kalam", "Dr. Ahmed Khan"]'
WHERE title = 'Rocket Propulsion Competition';

UPDATE events SET 
    subtitle = 'Webinar on health and medicine in space',
    location = 'Online',
    speakers = '["Dr. Lisa Wong", "Dr. Jane Doe"]'
WHERE title = 'Space Medicine Webinar';

UPDATE events SET 
    subtitle = 'Quiz competition for colleges on space topics',
    location = 'National Quiz Hall',
    speakers = '["Dr. Vikram Sarabhai", "Dr. Maria Garcia"]'
WHERE title = 'Inter-college Space Quiz';

UPDATE events SET 
    subtitle = 'Conference on astrophysics research and discoveries',
    location = 'Astrophysics Research Center',
    speakers = '["Dr. John Smith", "Dr. Ahmed Khan"]'
WHERE title = 'Astrophysics Conference';
