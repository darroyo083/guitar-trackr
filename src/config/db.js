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
        port: 3306,
        define: {
            timestamps: false,
            freezeTableName: true
        },
        retry: {
            max: 5,
            match: [
                /ECONNREFUSED/,
                /ETIMEDOUT/,
                /EHOSTUNREACH/,
                /SequelizeConnectionError/
            ]
        }
    }
);

export default connection;