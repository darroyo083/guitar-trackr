import { DataTypes } from 'sequelize';
import connection from '../config/db.js';

const Song = connection.define('songs', {
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
    },
    tuning: {
        type: DataTypes.STRING(50),
    },
    tablature_url: {
        type: DataTypes.STRING(255),
    },
});

export default Song;