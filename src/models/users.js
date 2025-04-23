import { DataTypes } from 'sequelize';
import connection from '../config/db.js';
import Song from './songs.js';

const User = connection.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
})

User.belongsToMany(Song, { through: 'user_songs', foreignKey: 'user_id' });
Song.belongsToMany(User, { through: 'user_songs', foreignKey: 'song_id' });

export default User;