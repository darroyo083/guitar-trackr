import express from 'express';
import apiRouter from './api/apiRouter.js';

const router = express.Router();

router.use('/api', apiRouter);

// Ruta para verificar que el servidor está funcionando
router.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Guitar Trackr' });
});

export default router;