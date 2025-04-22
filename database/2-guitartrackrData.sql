USE `guitartrackr`;

-- Insertar usuarios
INSERT INTO `users` (`username`, `email`, `password`, `role`) VALUES
('guitarHero', 'hero@example.com', 'hashedpass123', 'user'),
('metalhead92', 'metal@example.com', 'hashedpass456', 'user'),
('adminGuy', 'admin@example.com', 'supersecret', 'admin');

-- Insertar canciones
INSERT INTO `songs` (`title`, `artist`, `difficulty`, `tuning`, `tablature_url`) VALUES
('Nothing Else Matters', 'Metallica', 'medium', 'Standard', 'https://tabs.ultimate-guitar.com/tab/metallica/nothing-else-matters-tabs-14702'),
('Sweet Child O\' Mine', 'Guns N\' Roses', 'hard', 'Eb Standard', 'https://tabs.ultimate-guitar.com/tab/guns-n-roses/sweet-child-o-mine-tabs-54701'),
('Wish You Were Here', 'Pink Floyd', 'easy', 'Standard', 'https://tabs.ultimate-guitar.com/tab/pink-floyd/wish-you-were-here-tabs-17165');

-- Relacionar usuarios con canciones
INSERT INTO `user_songs` (`user_id`, `song_id`, `status`) VALUES
(1, 1, 'learned'),
(1, 2, 'pending'),
(2, 2, 'learned'),
(2, 3, 'pending'),
(3, 1, 'pending'),
(3, 3, 'learned');