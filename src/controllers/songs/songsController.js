import Song from '../../models/songs.js';
import User from '../../models/users.js';

// Obtener todas las canciones
export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.findAll();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una canción por ID
export const getSongById = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (song) {
            res.json(song);
        } else {
            res.status(404).json({ error: 'Canción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva canción
export const createSong = async (req, res) => {
    try {
        const { title, artist, difficulty, tuning, tablature_url } = req.body;
        const song = await Song.create({
            title,
            artist,
            difficulty,
            tuning,
            tablature_url
        });
        res.status(201).json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una canción
export const updateSong = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (song) {
            const { title, artist, difficulty, tuning, tablature_url } = req.body;
            await song.update({
                title: title || song.title,
                artist: artist || song.artist,
                difficulty: difficulty || song.difficulty,
                tuning: tuning || song.tuning,
                tablature_url: tablature_url || song.tablature_url
            });
            res.json(song);
        } else {
            res.status(404).json({ error: 'Canción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una canción
export const deleteSong = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (song) {
            await song.destroy();
            res.json({ message: 'Canción eliminada' });
        } else {
            res.status(404).json({ error: 'Canción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Añadir una canción al repertorio del usuario
export const addSongToUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const song = await Song.findByPk(req.params.id);
        
        if (!user || !song) {
            return res.status(404).json({ error: 'Usuario o canción no encontrada' });
        }
        
        await user.addSong(song);
        res.json({ message: 'Canción añadida al repertorio del usuario' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una canción del repertorio del usuario
export const removeSongFromUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const song = await Song.findByPk(req.params.id);
        
        if (!user || !song) {
            return res.status(404).json({ error: 'Usuario o canción no encontrada' });
        }
        
        await user.removeSong(song);
        res.json({ message: 'Canción eliminada del repertorio del usuario' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};