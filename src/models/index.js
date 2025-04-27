import User from './users.js';
import Song from './songs.js';

// relaciones
User.belongsToMany(Song, { 
    through: 'user_songs',
    foreignKey: 'user_id',
    otherKey: 'song_id' 
});

Song.belongsToMany(User, { 
    through: 'user_songs',
    foreignKey: 'song_id',
    otherKey: 'user_id' 
});

export { User, Song };