import User from '../../models/users.js';
import Song from '../../models/songs.js';

// Obtener todos los usuarios (solo admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID (solo admin o el propio usuario)
export const getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        // Verificar permisos: solo el propio usuario o un admin pueden ver los datos
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Song }]
        });
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener las canciones de un usuario
export const getUserSongs = async (req, res) => {
    try {
        const userId = req.params.id || req.user.id;
        
        // Verificar permisos: solo el propio usuario o un admin pueden ver las canciones
        if (req.user.id !== parseInt(userId) && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        
        const user = await User.findByPk(userId, {
            include: [{ model: Song }]
        });
        
        if (user) {
            res.json(user.Songs);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};