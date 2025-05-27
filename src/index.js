import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/router.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connection from './config/db.js';
import './models/index.js';  // Importar para configurar relaciones

// Cargar variables de entorno
dotenv.config();
// const CLIENT_URL = process.env.CLIENT_URL
// Crear servidor Express
const app = express();
// const corsOptions = {
//     origin: CLIENT_URL,
    // credentials: true
// }
const APP_PORT = process.env.APP_PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rutas
app.use('/', router);

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
    try {
        // Intentar conectar a la base de datos
        await connection.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        
        // Sincronizar los modelos con la base de datos
        await connection.sync();  // { alter: true } entre los parentesis | En producción cambiar a { alter: true } o quitar
        console.log('Modelos sincronizados con la base de datos.');
        
        // Iniciar el servidor
        app.listen(3000, () => {
            console.log(`API de Guitar Trackr escuchando en http://localhost:${APP_PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

// Iniciar el servidor
startServer();