-- Insertar usuarios
INSERT INTO `guitartrackr`.`users` (`username`, `email`, `password`, `role`)
VALUES 
('john_doe', 'john@example.com', 'hashed_password_1', 'user'),
('jane_admin', 'jane@example.com', 'hashed_password_2', 'admin');

-- Insertar canciones
INSERT INTO `guitartrackr`.`songs` (`title`, `artist`, `difficulty`, `tuning`, `tablature_url`)
VALUES 
('Nothing Else Matters', 'Metallica', 'medium', 'E Standard', 'https://example.com/metallica-tab'),
('Sweet Child O\' Mine', 'Guns N\' Roses', 'hard', 'Eb Standard', 'https://example.com/scom-tab'),
('Wish You Were Here', 'Pink Floyd', 'easy', 'E Standard', 'https://example.com/wywh-tab');

-- Relacionar usuarios con canciones (tabla intermedia sin campos adicionales)
INSERT INTO `guitartrackr`.`user_songs` (`user_id`, `song_id`)
VALUES 
(1, 1),
(1, 2),
(2, 3);
