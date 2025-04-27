import express from 'express';
import * as songsController from '../../controllers/songs/songsController.js';
import { authenticateJWT, isAdmin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getSongById);

// Rutas protegidas (requieren autenticación)
router.post('/', authenticateJWT, isAdmin, songsController.createSong);
router.put('/:id', authenticateJWT, isAdmin, songsController.updateSong);
router.delete('/:id', authenticateJWT, isAdmin, songsController.deleteSong);

// Rutas para la relación user-song
router.post('/:id/add', authenticateJWT, songsController.addSongToUser);
router.delete('/:id/remove', authenticateJWT, songsController.removeSongFromUser);

export default router;