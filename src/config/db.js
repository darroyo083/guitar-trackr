import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: 3306, // Cambiado para usar la variable de entorno
        define: {
            timestamps: false,
            freezeTableName: true
        },
        retry: {
            max: 5, // Número máximo de reintentos
            match: [
                /ECONNREFUSED/,
                /ETIMEDOUT/,
                /EHOSTUNREACH/,
                /SequelizeConnectionError/
            ]
        }
    }
);

// Probar la conexión
connection.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

export default connection;