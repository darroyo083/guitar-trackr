import express from 'express';
import * as usersController from '../../controllers/users/usersController.js';
import { authenticateJWT, isAdmin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Rutas protegidas (requieren autenticación)
router.get('/', authenticateJWT, isAdmin, usersController.getAllUsers);
router.get('/:id', authenticateJWT, usersController.getUserById);
router.get('/:id/songs', authenticateJWT, usersController.getUserSongs);

export default router;