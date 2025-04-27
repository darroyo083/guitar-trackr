import express from 'express';
import authRouter from './authRouter.js';
import songsRouter from './songsRouter.js';
import usersRouter from './usersRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/songs', songsRouter);
router.use('/users', usersRouter);

// Ruta para verificar que la API está funcionando
router.get('/', (req, res) => {
    res.json({ message: 'API de Guitar Trackr funcionando correctamente' });
});

export default router;