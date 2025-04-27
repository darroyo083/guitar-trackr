import express from 'express';
import { register, login, getProfile } from '../../controllers/auth/authController.js';
import { authenticateJWT } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);

export default router;